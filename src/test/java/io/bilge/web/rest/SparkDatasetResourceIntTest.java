package io.bilge.web.rest;

import io.bilge.BilgeApp;

import io.bilge.domain.SparkDataset;
import io.bilge.repository.SparkDatasetRepository;
import io.bilge.service.dto.SparkDatasetDTO;
import io.bilge.service.mapper.SparkDatasetMapper;
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
 * Test class for the SparkDatasetResource REST controller.
 *
 * @see SparkDatasetResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BilgeApp.class)
public class SparkDatasetResourceIntTest {

    private static final String DEFAULT_MODULE = "AAAAAAAAAA";
    private static final String UPDATED_MODULE = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESC = "AAAAAAAAAA";
    private static final String UPDATED_DESC = "BBBBBBBBBB";

    @Autowired
    private SparkDatasetRepository sparkDatasetRepository;

    @Autowired
    private SparkDatasetMapper sparkDatasetMapper;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSparkDatasetMockMvc;

    private SparkDataset sparkDataset;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SparkDatasetResource sparkDatasetResource = new SparkDatasetResource(sparkDatasetRepository, sparkDatasetMapper);
        this.restSparkDatasetMockMvc = MockMvcBuilders.standaloneSetup(sparkDatasetResource)
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
    public static SparkDataset createEntity(EntityManager em) {
        SparkDataset sparkDataset = new SparkDataset()
            .module(DEFAULT_MODULE)
            .name(DEFAULT_NAME)
            .desc(DEFAULT_DESC);
        return sparkDataset;
    }

    @Before
    public void initTest() {
        sparkDataset = createEntity(em);
    }

    @Test
    @Transactional
    public void createSparkDataset() throws Exception {
        int databaseSizeBeforeCreate = sparkDatasetRepository.findAll().size();

        // Create the SparkDataset
        SparkDatasetDTO sparkDatasetDTO = sparkDatasetMapper.toDto(sparkDataset);
        restSparkDatasetMockMvc.perform(post("/api/spark-datasets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sparkDatasetDTO)))
            .andExpect(status().isCreated());

        // Validate the SparkDataset in the database
        List<SparkDataset> sparkDatasetList = sparkDatasetRepository.findAll();
        assertThat(sparkDatasetList).hasSize(databaseSizeBeforeCreate + 1);
        SparkDataset testSparkDataset = sparkDatasetList.get(sparkDatasetList.size() - 1);
        assertThat(testSparkDataset.getModule()).isEqualTo(DEFAULT_MODULE);
        assertThat(testSparkDataset.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testSparkDataset.getDesc()).isEqualTo(DEFAULT_DESC);
    }

    @Test
    @Transactional
    public void createSparkDatasetWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sparkDatasetRepository.findAll().size();

        // Create the SparkDataset with an existing ID
        sparkDataset.setId(1L);
        SparkDatasetDTO sparkDatasetDTO = sparkDatasetMapper.toDto(sparkDataset);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSparkDatasetMockMvc.perform(post("/api/spark-datasets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sparkDatasetDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SparkDataset in the database
        List<SparkDataset> sparkDatasetList = sparkDatasetRepository.findAll();
        assertThat(sparkDatasetList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSparkDatasets() throws Exception {
        // Initialize the database
        sparkDatasetRepository.saveAndFlush(sparkDataset);

        // Get all the sparkDatasetList
        restSparkDatasetMockMvc.perform(get("/api/spark-datasets?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sparkDataset.getId().intValue())))
            .andExpect(jsonPath("$.[*].module").value(hasItem(DEFAULT_MODULE.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].desc").value(hasItem(DEFAULT_DESC.toString())));
    }

    @Test
    @Transactional
    public void getSparkDataset() throws Exception {
        // Initialize the database
        sparkDatasetRepository.saveAndFlush(sparkDataset);

        // Get the sparkDataset
        restSparkDatasetMockMvc.perform(get("/api/spark-datasets/{id}", sparkDataset.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(sparkDataset.getId().intValue()))
            .andExpect(jsonPath("$.module").value(DEFAULT_MODULE.toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.desc").value(DEFAULT_DESC.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSparkDataset() throws Exception {
        // Get the sparkDataset
        restSparkDatasetMockMvc.perform(get("/api/spark-datasets/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSparkDataset() throws Exception {
        // Initialize the database
        sparkDatasetRepository.saveAndFlush(sparkDataset);
        int databaseSizeBeforeUpdate = sparkDatasetRepository.findAll().size();

        // Update the sparkDataset
        SparkDataset updatedSparkDataset = sparkDatasetRepository.findOne(sparkDataset.getId());
        // Disconnect from session so that the updates on updatedSparkDataset are not directly saved in db
        em.detach(updatedSparkDataset);
        updatedSparkDataset
            .module(UPDATED_MODULE)
            .name(UPDATED_NAME)
            .desc(UPDATED_DESC);
        SparkDatasetDTO sparkDatasetDTO = sparkDatasetMapper.toDto(updatedSparkDataset);

        restSparkDatasetMockMvc.perform(put("/api/spark-datasets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sparkDatasetDTO)))
            .andExpect(status().isOk());

        // Validate the SparkDataset in the database
        List<SparkDataset> sparkDatasetList = sparkDatasetRepository.findAll();
        assertThat(sparkDatasetList).hasSize(databaseSizeBeforeUpdate);
        SparkDataset testSparkDataset = sparkDatasetList.get(sparkDatasetList.size() - 1);
        assertThat(testSparkDataset.getModule()).isEqualTo(UPDATED_MODULE);
        assertThat(testSparkDataset.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testSparkDataset.getDesc()).isEqualTo(UPDATED_DESC);
    }

    @Test
    @Transactional
    public void updateNonExistingSparkDataset() throws Exception {
        int databaseSizeBeforeUpdate = sparkDatasetRepository.findAll().size();

        // Create the SparkDataset
        SparkDatasetDTO sparkDatasetDTO = sparkDatasetMapper.toDto(sparkDataset);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSparkDatasetMockMvc.perform(put("/api/spark-datasets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sparkDatasetDTO)))
            .andExpect(status().isCreated());

        // Validate the SparkDataset in the database
        List<SparkDataset> sparkDatasetList = sparkDatasetRepository.findAll();
        assertThat(sparkDatasetList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSparkDataset() throws Exception {
        // Initialize the database
        sparkDatasetRepository.saveAndFlush(sparkDataset);
        int databaseSizeBeforeDelete = sparkDatasetRepository.findAll().size();

        // Get the sparkDataset
        restSparkDatasetMockMvc.perform(delete("/api/spark-datasets/{id}", sparkDataset.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SparkDataset> sparkDatasetList = sparkDatasetRepository.findAll();
        assertThat(sparkDatasetList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SparkDataset.class);
        SparkDataset sparkDataset1 = new SparkDataset();
        sparkDataset1.setId(1L);
        SparkDataset sparkDataset2 = new SparkDataset();
        sparkDataset2.setId(sparkDataset1.getId());
        assertThat(sparkDataset1).isEqualTo(sparkDataset2);
        sparkDataset2.setId(2L);
        assertThat(sparkDataset1).isNotEqualTo(sparkDataset2);
        sparkDataset1.setId(null);
        assertThat(sparkDataset1).isNotEqualTo(sparkDataset2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SparkDatasetDTO.class);
        SparkDatasetDTO sparkDatasetDTO1 = new SparkDatasetDTO();
        sparkDatasetDTO1.setId(1L);
        SparkDatasetDTO sparkDatasetDTO2 = new SparkDatasetDTO();
        assertThat(sparkDatasetDTO1).isNotEqualTo(sparkDatasetDTO2);
        sparkDatasetDTO2.setId(sparkDatasetDTO1.getId());
        assertThat(sparkDatasetDTO1).isEqualTo(sparkDatasetDTO2);
        sparkDatasetDTO2.setId(2L);
        assertThat(sparkDatasetDTO1).isNotEqualTo(sparkDatasetDTO2);
        sparkDatasetDTO1.setId(null);
        assertThat(sparkDatasetDTO1).isNotEqualTo(sparkDatasetDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(sparkDatasetMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(sparkDatasetMapper.fromId(null)).isNull();
    }
}
