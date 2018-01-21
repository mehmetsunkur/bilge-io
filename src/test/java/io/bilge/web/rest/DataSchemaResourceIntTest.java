package io.bilge.web.rest;

import io.bilge.BilgeApp;

import io.bilge.domain.DataSchema;
import io.bilge.repository.DataSchemaRepository;
import io.bilge.service.dto.DataSchemaDTO;
import io.bilge.service.mapper.DataSchemaMapper;
import io.bilge.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static io.bilge.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the DataSchemaResource REST controller.
 *
 * @see DataSchemaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BilgeApp.class)
public class DataSchemaResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Long DEFAULT_TABLE_COUNT = 1L;
    private static final Long UPDATED_TABLE_COUNT = 2L;

    @Autowired
    private DataSchemaRepository dataSchemaRepository;

    @Autowired
    private DataSchemaMapper dataSchemaMapper;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDataSchemaMockMvc;

    private DataSchema dataSchema;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DataSchemaResource dataSchemaResource = new DataSchemaResource(dataSchemaRepository, dataSchemaMapper);
        this.restDataSchemaMockMvc = MockMvcBuilders.standaloneSetup(dataSchemaResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DataSchema createEntity(EntityManager em) {
        DataSchema dataSchema = new DataSchema()
            .name(DEFAULT_NAME)
            .tableCount(DEFAULT_TABLE_COUNT);
        return dataSchema;
    }

    @Before
    public void initTest() {
        dataSchema = createEntity(em);
    }

    @Test
    @Transactional
    public void createDataSchema() throws Exception {
        int databaseSizeBeforeCreate = dataSchemaRepository.findAll().size();

        // Create the DataSchema
        DataSchemaDTO dataSchemaDTO = dataSchemaMapper.toDto(dataSchema);
        restDataSchemaMockMvc.perform(post("/api/data-schemas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dataSchemaDTO)))
            .andExpect(status().isCreated());

        // Validate the DataSchema in the database
        List<DataSchema> dataSchemaList = dataSchemaRepository.findAll();
        assertThat(dataSchemaList).hasSize(databaseSizeBeforeCreate + 1);
        DataSchema testDataSchema = dataSchemaList.get(dataSchemaList.size() - 1);
        assertThat(testDataSchema.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testDataSchema.getTableCount()).isEqualTo(DEFAULT_TABLE_COUNT);
    }

    @Test
    @Transactional
    public void createDataSchemaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = dataSchemaRepository.findAll().size();

        // Create the DataSchema with an existing ID
        dataSchema.setId(1L);
        DataSchemaDTO dataSchemaDTO = dataSchemaMapper.toDto(dataSchema);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDataSchemaMockMvc.perform(post("/api/data-schemas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dataSchemaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the DataSchema in the database
        List<DataSchema> dataSchemaList = dataSchemaRepository.findAll();
        assertThat(dataSchemaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDataSchemas() throws Exception {
        // Initialize the database
        dataSchemaRepository.saveAndFlush(dataSchema);

        // Get all the dataSchemaList
        restDataSchemaMockMvc.perform(get("/api/data-schemas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dataSchema.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].tableCount").value(hasItem(DEFAULT_TABLE_COUNT.intValue())));
    }

    @Test
    @Transactional
    public void getDataSchema() throws Exception {
        // Initialize the database
        dataSchemaRepository.saveAndFlush(dataSchema);

        // Get the dataSchema
        restDataSchemaMockMvc.perform(get("/api/data-schemas/{id}", dataSchema.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(dataSchema.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.tableCount").value(DEFAULT_TABLE_COUNT.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingDataSchema() throws Exception {
        // Get the dataSchema
        restDataSchemaMockMvc.perform(get("/api/data-schemas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDataSchema() throws Exception {
        // Initialize the database
        dataSchemaRepository.saveAndFlush(dataSchema);
        int databaseSizeBeforeUpdate = dataSchemaRepository.findAll().size();

        // Update the dataSchema
        DataSchema updatedDataSchema = dataSchemaRepository.findOne(dataSchema.getId());
        // Disconnect from session so that the updates on updatedDataSchema are not directly saved in db
        em.detach(updatedDataSchema);
        updatedDataSchema
            .name(UPDATED_NAME)
            .tableCount(UPDATED_TABLE_COUNT);
        DataSchemaDTO dataSchemaDTO = dataSchemaMapper.toDto(updatedDataSchema);

        restDataSchemaMockMvc.perform(put("/api/data-schemas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dataSchemaDTO)))
            .andExpect(status().isOk());

        // Validate the DataSchema in the database
        List<DataSchema> dataSchemaList = dataSchemaRepository.findAll();
        assertThat(dataSchemaList).hasSize(databaseSizeBeforeUpdate);
        DataSchema testDataSchema = dataSchemaList.get(dataSchemaList.size() - 1);
        assertThat(testDataSchema.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testDataSchema.getTableCount()).isEqualTo(UPDATED_TABLE_COUNT);
    }

    @Test
    @Transactional
    public void updateNonExistingDataSchema() throws Exception {
        int databaseSizeBeforeUpdate = dataSchemaRepository.findAll().size();

        // Create the DataSchema
        DataSchemaDTO dataSchemaDTO = dataSchemaMapper.toDto(dataSchema);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDataSchemaMockMvc.perform(put("/api/data-schemas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dataSchemaDTO)))
            .andExpect(status().isCreated());

        // Validate the DataSchema in the database
        List<DataSchema> dataSchemaList = dataSchemaRepository.findAll();
        assertThat(dataSchemaList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDataSchema() throws Exception {
        // Initialize the database
        dataSchemaRepository.saveAndFlush(dataSchema);
        int databaseSizeBeforeDelete = dataSchemaRepository.findAll().size();

        // Get the dataSchema
        restDataSchemaMockMvc.perform(delete("/api/data-schemas/{id}", dataSchema.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DataSchema> dataSchemaList = dataSchemaRepository.findAll();
        assertThat(dataSchemaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DataSchema.class);
        DataSchema dataSchema1 = new DataSchema();
        dataSchema1.setId(1L);
        DataSchema dataSchema2 = new DataSchema();
        dataSchema2.setId(dataSchema1.getId());
        assertThat(dataSchema1).isEqualTo(dataSchema2);
        dataSchema2.setId(2L);
        assertThat(dataSchema1).isNotEqualTo(dataSchema2);
        dataSchema1.setId(null);
        assertThat(dataSchema1).isNotEqualTo(dataSchema2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DataSchemaDTO.class);
        DataSchemaDTO dataSchemaDTO1 = new DataSchemaDTO();
        dataSchemaDTO1.setId(1L);
        DataSchemaDTO dataSchemaDTO2 = new DataSchemaDTO();
        assertThat(dataSchemaDTO1).isNotEqualTo(dataSchemaDTO2);
        dataSchemaDTO2.setId(dataSchemaDTO1.getId());
        assertThat(dataSchemaDTO1).isEqualTo(dataSchemaDTO2);
        dataSchemaDTO2.setId(2L);
        assertThat(dataSchemaDTO1).isNotEqualTo(dataSchemaDTO2);
        dataSchemaDTO1.setId(null);
        assertThat(dataSchemaDTO1).isNotEqualTo(dataSchemaDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(dataSchemaMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(dataSchemaMapper.fromId(null)).isNull();
    }
}
