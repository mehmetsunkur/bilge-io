package io.bilge.web.rest;

import io.bilge.BilgeApp;

import io.bilge.domain.SparkDestinationColumn;
import io.bilge.repository.SparkDestinationColumnRepository;
import io.bilge.service.dto.SparkDestinationColumnDTO;
import io.bilge.service.mapper.SparkDestinationColumnMapper;
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
 * Test class for the SparkDestinationColumnResource REST controller.
 *
 * @see SparkDestinationColumnResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BilgeApp.class)
public class SparkDestinationColumnResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_DESC = "AAAAAAAAAA";
    private static final String UPDATED_DESC = "BBBBBBBBBB";

    @Autowired
    private SparkDestinationColumnRepository sparkDestinationColumnRepository;

    @Autowired
    private SparkDestinationColumnMapper sparkDestinationColumnMapper;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSparkDestinationColumnMockMvc;

    private SparkDestinationColumn sparkDestinationColumn;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SparkDestinationColumnResource sparkDestinationColumnResource = new SparkDestinationColumnResource(sparkDestinationColumnRepository, sparkDestinationColumnMapper);
        this.restSparkDestinationColumnMockMvc = MockMvcBuilders.standaloneSetup(sparkDestinationColumnResource)
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
    public static SparkDestinationColumn createEntity(EntityManager em) {
        SparkDestinationColumn sparkDestinationColumn = new SparkDestinationColumn()
            .name(DEFAULT_NAME)
            .type(DEFAULT_TYPE)
            .desc(DEFAULT_DESC);
        return sparkDestinationColumn;
    }

    @Before
    public void initTest() {
        sparkDestinationColumn = createEntity(em);
    }

    @Test
    @Transactional
    public void createSparkDestinationColumn() throws Exception {
        int databaseSizeBeforeCreate = sparkDestinationColumnRepository.findAll().size();

        // Create the SparkDestinationColumn
        SparkDestinationColumnDTO sparkDestinationColumnDTO = sparkDestinationColumnMapper.toDto(sparkDestinationColumn);
        restSparkDestinationColumnMockMvc.perform(post("/api/spark-destination-columns")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sparkDestinationColumnDTO)))
            .andExpect(status().isCreated());

        // Validate the SparkDestinationColumn in the database
        List<SparkDestinationColumn> sparkDestinationColumnList = sparkDestinationColumnRepository.findAll();
        assertThat(sparkDestinationColumnList).hasSize(databaseSizeBeforeCreate + 1);
        SparkDestinationColumn testSparkDestinationColumn = sparkDestinationColumnList.get(sparkDestinationColumnList.size() - 1);
        assertThat(testSparkDestinationColumn.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testSparkDestinationColumn.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testSparkDestinationColumn.getDesc()).isEqualTo(DEFAULT_DESC);
    }

    @Test
    @Transactional
    public void createSparkDestinationColumnWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sparkDestinationColumnRepository.findAll().size();

        // Create the SparkDestinationColumn with an existing ID
        sparkDestinationColumn.setId(1L);
        SparkDestinationColumnDTO sparkDestinationColumnDTO = sparkDestinationColumnMapper.toDto(sparkDestinationColumn);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSparkDestinationColumnMockMvc.perform(post("/api/spark-destination-columns")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sparkDestinationColumnDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SparkDestinationColumn in the database
        List<SparkDestinationColumn> sparkDestinationColumnList = sparkDestinationColumnRepository.findAll();
        assertThat(sparkDestinationColumnList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSparkDestinationColumns() throws Exception {
        // Initialize the database
        sparkDestinationColumnRepository.saveAndFlush(sparkDestinationColumn);

        // Get all the sparkDestinationColumnList
        restSparkDestinationColumnMockMvc.perform(get("/api/spark-destination-columns?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sparkDestinationColumn.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].desc").value(hasItem(DEFAULT_DESC.toString())));
    }

    @Test
    @Transactional
    public void getSparkDestinationColumn() throws Exception {
        // Initialize the database
        sparkDestinationColumnRepository.saveAndFlush(sparkDestinationColumn);

        // Get the sparkDestinationColumn
        restSparkDestinationColumnMockMvc.perform(get("/api/spark-destination-columns/{id}", sparkDestinationColumn.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(sparkDestinationColumn.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.desc").value(DEFAULT_DESC.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSparkDestinationColumn() throws Exception {
        // Get the sparkDestinationColumn
        restSparkDestinationColumnMockMvc.perform(get("/api/spark-destination-columns/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSparkDestinationColumn() throws Exception {
        // Initialize the database
        sparkDestinationColumnRepository.saveAndFlush(sparkDestinationColumn);
        int databaseSizeBeforeUpdate = sparkDestinationColumnRepository.findAll().size();

        // Update the sparkDestinationColumn
        SparkDestinationColumn updatedSparkDestinationColumn = sparkDestinationColumnRepository.findOne(sparkDestinationColumn.getId());
        // Disconnect from session so that the updates on updatedSparkDestinationColumn are not directly saved in db
        em.detach(updatedSparkDestinationColumn);
        updatedSparkDestinationColumn
            .name(UPDATED_NAME)
            .type(UPDATED_TYPE)
            .desc(UPDATED_DESC);
        SparkDestinationColumnDTO sparkDestinationColumnDTO = sparkDestinationColumnMapper.toDto(updatedSparkDestinationColumn);

        restSparkDestinationColumnMockMvc.perform(put("/api/spark-destination-columns")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sparkDestinationColumnDTO)))
            .andExpect(status().isOk());

        // Validate the SparkDestinationColumn in the database
        List<SparkDestinationColumn> sparkDestinationColumnList = sparkDestinationColumnRepository.findAll();
        assertThat(sparkDestinationColumnList).hasSize(databaseSizeBeforeUpdate);
        SparkDestinationColumn testSparkDestinationColumn = sparkDestinationColumnList.get(sparkDestinationColumnList.size() - 1);
        assertThat(testSparkDestinationColumn.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testSparkDestinationColumn.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testSparkDestinationColumn.getDesc()).isEqualTo(UPDATED_DESC);
    }

    @Test
    @Transactional
    public void updateNonExistingSparkDestinationColumn() throws Exception {
        int databaseSizeBeforeUpdate = sparkDestinationColumnRepository.findAll().size();

        // Create the SparkDestinationColumn
        SparkDestinationColumnDTO sparkDestinationColumnDTO = sparkDestinationColumnMapper.toDto(sparkDestinationColumn);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSparkDestinationColumnMockMvc.perform(put("/api/spark-destination-columns")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sparkDestinationColumnDTO)))
            .andExpect(status().isCreated());

        // Validate the SparkDestinationColumn in the database
        List<SparkDestinationColumn> sparkDestinationColumnList = sparkDestinationColumnRepository.findAll();
        assertThat(sparkDestinationColumnList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSparkDestinationColumn() throws Exception {
        // Initialize the database
        sparkDestinationColumnRepository.saveAndFlush(sparkDestinationColumn);
        int databaseSizeBeforeDelete = sparkDestinationColumnRepository.findAll().size();

        // Get the sparkDestinationColumn
        restSparkDestinationColumnMockMvc.perform(delete("/api/spark-destination-columns/{id}", sparkDestinationColumn.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SparkDestinationColumn> sparkDestinationColumnList = sparkDestinationColumnRepository.findAll();
        assertThat(sparkDestinationColumnList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SparkDestinationColumn.class);
        SparkDestinationColumn sparkDestinationColumn1 = new SparkDestinationColumn();
        sparkDestinationColumn1.setId(1L);
        SparkDestinationColumn sparkDestinationColumn2 = new SparkDestinationColumn();
        sparkDestinationColumn2.setId(sparkDestinationColumn1.getId());
        assertThat(sparkDestinationColumn1).isEqualTo(sparkDestinationColumn2);
        sparkDestinationColumn2.setId(2L);
        assertThat(sparkDestinationColumn1).isNotEqualTo(sparkDestinationColumn2);
        sparkDestinationColumn1.setId(null);
        assertThat(sparkDestinationColumn1).isNotEqualTo(sparkDestinationColumn2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SparkDestinationColumnDTO.class);
        SparkDestinationColumnDTO sparkDestinationColumnDTO1 = new SparkDestinationColumnDTO();
        sparkDestinationColumnDTO1.setId(1L);
        SparkDestinationColumnDTO sparkDestinationColumnDTO2 = new SparkDestinationColumnDTO();
        assertThat(sparkDestinationColumnDTO1).isNotEqualTo(sparkDestinationColumnDTO2);
        sparkDestinationColumnDTO2.setId(sparkDestinationColumnDTO1.getId());
        assertThat(sparkDestinationColumnDTO1).isEqualTo(sparkDestinationColumnDTO2);
        sparkDestinationColumnDTO2.setId(2L);
        assertThat(sparkDestinationColumnDTO1).isNotEqualTo(sparkDestinationColumnDTO2);
        sparkDestinationColumnDTO1.setId(null);
        assertThat(sparkDestinationColumnDTO1).isNotEqualTo(sparkDestinationColumnDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(sparkDestinationColumnMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(sparkDestinationColumnMapper.fromId(null)).isNull();
    }
}
