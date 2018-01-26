package io.bilge.web.rest;

import io.bilge.BilgeApp;

import io.bilge.domain.SparkDatasetColumn;
import io.bilge.repository.SparkDatasetColumnRepository;
import io.bilge.service.dto.SparkDatasetColumnDTO;
import io.bilge.service.mapper.SparkDatasetColumnMapper;
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

import io.bilge.domain.enumeration.ColumnType;
/**
 * Test class for the SparkDatasetColumnResource REST controller.
 *
 * @see SparkDatasetColumnResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BilgeApp.class)
public class SparkDatasetColumnResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final ColumnType DEFAULT_TYPE = ColumnType.CHAR;
    private static final ColumnType UPDATED_TYPE = ColumnType.VARCHAR;

    private static final String DEFAULT_DESC = "AAAAAAAAAA";
    private static final String UPDATED_DESC = "BBBBBBBBBB";

    @Autowired
    private SparkDatasetColumnRepository sparkDatasetColumnRepository;

    @Autowired
    private SparkDatasetColumnMapper sparkDatasetColumnMapper;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSparkDatasetColumnMockMvc;

    private SparkDatasetColumn sparkDatasetColumn;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SparkDatasetColumnResource sparkDatasetColumnResource = new SparkDatasetColumnResource(sparkDatasetColumnRepository, sparkDatasetColumnMapper);
        this.restSparkDatasetColumnMockMvc = MockMvcBuilders.standaloneSetup(sparkDatasetColumnResource)
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
    public static SparkDatasetColumn createEntity(EntityManager em) {
        SparkDatasetColumn sparkDatasetColumn = new SparkDatasetColumn()
            .name(DEFAULT_NAME)
            .type(DEFAULT_TYPE)
            .desc(DEFAULT_DESC);
        return sparkDatasetColumn;
    }

    @Before
    public void initTest() {
        sparkDatasetColumn = createEntity(em);
    }

    @Test
    @Transactional
    public void createSparkDatasetColumn() throws Exception {
        int databaseSizeBeforeCreate = sparkDatasetColumnRepository.findAll().size();

        // Create the SparkDatasetColumn
        SparkDatasetColumnDTO sparkDatasetColumnDTO = sparkDatasetColumnMapper.toDto(sparkDatasetColumn);
        restSparkDatasetColumnMockMvc.perform(post("/api/spark-dataset-columns")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sparkDatasetColumnDTO)))
            .andExpect(status().isCreated());

        // Validate the SparkDatasetColumn in the database
        List<SparkDatasetColumn> sparkDatasetColumnList = sparkDatasetColumnRepository.findAll();
        assertThat(sparkDatasetColumnList).hasSize(databaseSizeBeforeCreate + 1);
        SparkDatasetColumn testSparkDatasetColumn = sparkDatasetColumnList.get(sparkDatasetColumnList.size() - 1);
        assertThat(testSparkDatasetColumn.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testSparkDatasetColumn.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testSparkDatasetColumn.getDesc()).isEqualTo(DEFAULT_DESC);
    }

    @Test
    @Transactional
    public void createSparkDatasetColumnWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sparkDatasetColumnRepository.findAll().size();

        // Create the SparkDatasetColumn with an existing ID
        sparkDatasetColumn.setId(1L);
        SparkDatasetColumnDTO sparkDatasetColumnDTO = sparkDatasetColumnMapper.toDto(sparkDatasetColumn);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSparkDatasetColumnMockMvc.perform(post("/api/spark-dataset-columns")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sparkDatasetColumnDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SparkDatasetColumn in the database
        List<SparkDatasetColumn> sparkDatasetColumnList = sparkDatasetColumnRepository.findAll();
        assertThat(sparkDatasetColumnList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSparkDatasetColumns() throws Exception {
        // Initialize the database
        sparkDatasetColumnRepository.saveAndFlush(sparkDatasetColumn);

        // Get all the sparkDatasetColumnList
        restSparkDatasetColumnMockMvc.perform(get("/api/spark-dataset-columns?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sparkDatasetColumn.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].desc").value(hasItem(DEFAULT_DESC.toString())));
    }

    @Test
    @Transactional
    public void getSparkDatasetColumn() throws Exception {
        // Initialize the database
        sparkDatasetColumnRepository.saveAndFlush(sparkDatasetColumn);

        // Get the sparkDatasetColumn
        restSparkDatasetColumnMockMvc.perform(get("/api/spark-dataset-columns/{id}", sparkDatasetColumn.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(sparkDatasetColumn.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.desc").value(DEFAULT_DESC.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSparkDatasetColumn() throws Exception {
        // Get the sparkDatasetColumn
        restSparkDatasetColumnMockMvc.perform(get("/api/spark-dataset-columns/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSparkDatasetColumn() throws Exception {
        // Initialize the database
        sparkDatasetColumnRepository.saveAndFlush(sparkDatasetColumn);
        int databaseSizeBeforeUpdate = sparkDatasetColumnRepository.findAll().size();

        // Update the sparkDatasetColumn
        SparkDatasetColumn updatedSparkDatasetColumn = sparkDatasetColumnRepository.findOne(sparkDatasetColumn.getId());
        // Disconnect from session so that the updates on updatedSparkDatasetColumn are not directly saved in db
        em.detach(updatedSparkDatasetColumn);
        updatedSparkDatasetColumn
            .name(UPDATED_NAME)
            .type(UPDATED_TYPE)
            .desc(UPDATED_DESC);
        SparkDatasetColumnDTO sparkDatasetColumnDTO = sparkDatasetColumnMapper.toDto(updatedSparkDatasetColumn);

        restSparkDatasetColumnMockMvc.perform(put("/api/spark-dataset-columns")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sparkDatasetColumnDTO)))
            .andExpect(status().isOk());

        // Validate the SparkDatasetColumn in the database
        List<SparkDatasetColumn> sparkDatasetColumnList = sparkDatasetColumnRepository.findAll();
        assertThat(sparkDatasetColumnList).hasSize(databaseSizeBeforeUpdate);
        SparkDatasetColumn testSparkDatasetColumn = sparkDatasetColumnList.get(sparkDatasetColumnList.size() - 1);
        assertThat(testSparkDatasetColumn.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testSparkDatasetColumn.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testSparkDatasetColumn.getDesc()).isEqualTo(UPDATED_DESC);
    }

    @Test
    @Transactional
    public void updateNonExistingSparkDatasetColumn() throws Exception {
        int databaseSizeBeforeUpdate = sparkDatasetColumnRepository.findAll().size();

        // Create the SparkDatasetColumn
        SparkDatasetColumnDTO sparkDatasetColumnDTO = sparkDatasetColumnMapper.toDto(sparkDatasetColumn);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSparkDatasetColumnMockMvc.perform(put("/api/spark-dataset-columns")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sparkDatasetColumnDTO)))
            .andExpect(status().isCreated());

        // Validate the SparkDatasetColumn in the database
        List<SparkDatasetColumn> sparkDatasetColumnList = sparkDatasetColumnRepository.findAll();
        assertThat(sparkDatasetColumnList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSparkDatasetColumn() throws Exception {
        // Initialize the database
        sparkDatasetColumnRepository.saveAndFlush(sparkDatasetColumn);
        int databaseSizeBeforeDelete = sparkDatasetColumnRepository.findAll().size();

        // Get the sparkDatasetColumn
        restSparkDatasetColumnMockMvc.perform(delete("/api/spark-dataset-columns/{id}", sparkDatasetColumn.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SparkDatasetColumn> sparkDatasetColumnList = sparkDatasetColumnRepository.findAll();
        assertThat(sparkDatasetColumnList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SparkDatasetColumn.class);
        SparkDatasetColumn sparkDatasetColumn1 = new SparkDatasetColumn();
        sparkDatasetColumn1.setId(1L);
        SparkDatasetColumn sparkDatasetColumn2 = new SparkDatasetColumn();
        sparkDatasetColumn2.setId(sparkDatasetColumn1.getId());
        assertThat(sparkDatasetColumn1).isEqualTo(sparkDatasetColumn2);
        sparkDatasetColumn2.setId(2L);
        assertThat(sparkDatasetColumn1).isNotEqualTo(sparkDatasetColumn2);
        sparkDatasetColumn1.setId(null);
        assertThat(sparkDatasetColumn1).isNotEqualTo(sparkDatasetColumn2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SparkDatasetColumnDTO.class);
        SparkDatasetColumnDTO sparkDatasetColumnDTO1 = new SparkDatasetColumnDTO();
        sparkDatasetColumnDTO1.setId(1L);
        SparkDatasetColumnDTO sparkDatasetColumnDTO2 = new SparkDatasetColumnDTO();
        assertThat(sparkDatasetColumnDTO1).isNotEqualTo(sparkDatasetColumnDTO2);
        sparkDatasetColumnDTO2.setId(sparkDatasetColumnDTO1.getId());
        assertThat(sparkDatasetColumnDTO1).isEqualTo(sparkDatasetColumnDTO2);
        sparkDatasetColumnDTO2.setId(2L);
        assertThat(sparkDatasetColumnDTO1).isNotEqualTo(sparkDatasetColumnDTO2);
        sparkDatasetColumnDTO1.setId(null);
        assertThat(sparkDatasetColumnDTO1).isNotEqualTo(sparkDatasetColumnDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(sparkDatasetColumnMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(sparkDatasetColumnMapper.fromId(null)).isNull();
    }
}
