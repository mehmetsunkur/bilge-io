package io.bilge.web.rest;

import io.bilge.BilgeApp;

import io.bilge.domain.SparkDestinationTable;
import io.bilge.repository.SparkDestinationTableRepository;
import io.bilge.service.dto.SparkDestinationTableDTO;
import io.bilge.service.mapper.SparkDestinationTableMapper;
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
 * Test class for the SparkDestinationTableResource REST controller.
 *
 * @see SparkDestinationTableResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BilgeApp.class)
public class SparkDestinationTableResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESC = "AAAAAAAAAA";
    private static final String UPDATED_DESC = "BBBBBBBBBB";

    @Autowired
    private SparkDestinationTableRepository sparkDestinationTableRepository;

    @Autowired
    private SparkDestinationTableMapper sparkDestinationTableMapper;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSparkDestinationTableMockMvc;

    private SparkDestinationTable sparkDestinationTable;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SparkDestinationTableResource sparkDestinationTableResource = new SparkDestinationTableResource(sparkDestinationTableRepository, sparkDestinationTableMapper);
        this.restSparkDestinationTableMockMvc = MockMvcBuilders.standaloneSetup(sparkDestinationTableResource)
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
    public static SparkDestinationTable createEntity(EntityManager em) {
        SparkDestinationTable sparkDestinationTable = new SparkDestinationTable()
            .name(DEFAULT_NAME)
            .desc(DEFAULT_DESC);
        return sparkDestinationTable;
    }

    @Before
    public void initTest() {
        sparkDestinationTable = createEntity(em);
    }

    @Test
    @Transactional
    public void createSparkDestinationTable() throws Exception {
        int databaseSizeBeforeCreate = sparkDestinationTableRepository.findAll().size();

        // Create the SparkDestinationTable
        SparkDestinationTableDTO sparkDestinationTableDTO = sparkDestinationTableMapper.toDto(sparkDestinationTable);
        restSparkDestinationTableMockMvc.perform(post("/api/spark-destination-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sparkDestinationTableDTO)))
            .andExpect(status().isCreated());

        // Validate the SparkDestinationTable in the database
        List<SparkDestinationTable> sparkDestinationTableList = sparkDestinationTableRepository.findAll();
        assertThat(sparkDestinationTableList).hasSize(databaseSizeBeforeCreate + 1);
        SparkDestinationTable testSparkDestinationTable = sparkDestinationTableList.get(sparkDestinationTableList.size() - 1);
        assertThat(testSparkDestinationTable.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testSparkDestinationTable.getDesc()).isEqualTo(DEFAULT_DESC);
    }

    @Test
    @Transactional
    public void createSparkDestinationTableWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sparkDestinationTableRepository.findAll().size();

        // Create the SparkDestinationTable with an existing ID
        sparkDestinationTable.setId(1L);
        SparkDestinationTableDTO sparkDestinationTableDTO = sparkDestinationTableMapper.toDto(sparkDestinationTable);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSparkDestinationTableMockMvc.perform(post("/api/spark-destination-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sparkDestinationTableDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SparkDestinationTable in the database
        List<SparkDestinationTable> sparkDestinationTableList = sparkDestinationTableRepository.findAll();
        assertThat(sparkDestinationTableList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSparkDestinationTables() throws Exception {
        // Initialize the database
        sparkDestinationTableRepository.saveAndFlush(sparkDestinationTable);

        // Get all the sparkDestinationTableList
        restSparkDestinationTableMockMvc.perform(get("/api/spark-destination-tables?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sparkDestinationTable.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].desc").value(hasItem(DEFAULT_DESC.toString())));
    }

    @Test
    @Transactional
    public void getSparkDestinationTable() throws Exception {
        // Initialize the database
        sparkDestinationTableRepository.saveAndFlush(sparkDestinationTable);

        // Get the sparkDestinationTable
        restSparkDestinationTableMockMvc.perform(get("/api/spark-destination-tables/{id}", sparkDestinationTable.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(sparkDestinationTable.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.desc").value(DEFAULT_DESC.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSparkDestinationTable() throws Exception {
        // Get the sparkDestinationTable
        restSparkDestinationTableMockMvc.perform(get("/api/spark-destination-tables/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSparkDestinationTable() throws Exception {
        // Initialize the database
        sparkDestinationTableRepository.saveAndFlush(sparkDestinationTable);
        int databaseSizeBeforeUpdate = sparkDestinationTableRepository.findAll().size();

        // Update the sparkDestinationTable
        SparkDestinationTable updatedSparkDestinationTable = sparkDestinationTableRepository.findOne(sparkDestinationTable.getId());
        // Disconnect from session so that the updates on updatedSparkDestinationTable are not directly saved in db
        em.detach(updatedSparkDestinationTable);
        updatedSparkDestinationTable
            .name(UPDATED_NAME)
            .desc(UPDATED_DESC);
        SparkDestinationTableDTO sparkDestinationTableDTO = sparkDestinationTableMapper.toDto(updatedSparkDestinationTable);

        restSparkDestinationTableMockMvc.perform(put("/api/spark-destination-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sparkDestinationTableDTO)))
            .andExpect(status().isOk());

        // Validate the SparkDestinationTable in the database
        List<SparkDestinationTable> sparkDestinationTableList = sparkDestinationTableRepository.findAll();
        assertThat(sparkDestinationTableList).hasSize(databaseSizeBeforeUpdate);
        SparkDestinationTable testSparkDestinationTable = sparkDestinationTableList.get(sparkDestinationTableList.size() - 1);
        assertThat(testSparkDestinationTable.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testSparkDestinationTable.getDesc()).isEqualTo(UPDATED_DESC);
    }

    @Test
    @Transactional
    public void updateNonExistingSparkDestinationTable() throws Exception {
        int databaseSizeBeforeUpdate = sparkDestinationTableRepository.findAll().size();

        // Create the SparkDestinationTable
        SparkDestinationTableDTO sparkDestinationTableDTO = sparkDestinationTableMapper.toDto(sparkDestinationTable);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSparkDestinationTableMockMvc.perform(put("/api/spark-destination-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sparkDestinationTableDTO)))
            .andExpect(status().isCreated());

        // Validate the SparkDestinationTable in the database
        List<SparkDestinationTable> sparkDestinationTableList = sparkDestinationTableRepository.findAll();
        assertThat(sparkDestinationTableList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSparkDestinationTable() throws Exception {
        // Initialize the database
        sparkDestinationTableRepository.saveAndFlush(sparkDestinationTable);
        int databaseSizeBeforeDelete = sparkDestinationTableRepository.findAll().size();

        // Get the sparkDestinationTable
        restSparkDestinationTableMockMvc.perform(delete("/api/spark-destination-tables/{id}", sparkDestinationTable.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SparkDestinationTable> sparkDestinationTableList = sparkDestinationTableRepository.findAll();
        assertThat(sparkDestinationTableList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SparkDestinationTable.class);
        SparkDestinationTable sparkDestinationTable1 = new SparkDestinationTable();
        sparkDestinationTable1.setId(1L);
        SparkDestinationTable sparkDestinationTable2 = new SparkDestinationTable();
        sparkDestinationTable2.setId(sparkDestinationTable1.getId());
        assertThat(sparkDestinationTable1).isEqualTo(sparkDestinationTable2);
        sparkDestinationTable2.setId(2L);
        assertThat(sparkDestinationTable1).isNotEqualTo(sparkDestinationTable2);
        sparkDestinationTable1.setId(null);
        assertThat(sparkDestinationTable1).isNotEqualTo(sparkDestinationTable2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SparkDestinationTableDTO.class);
        SparkDestinationTableDTO sparkDestinationTableDTO1 = new SparkDestinationTableDTO();
        sparkDestinationTableDTO1.setId(1L);
        SparkDestinationTableDTO sparkDestinationTableDTO2 = new SparkDestinationTableDTO();
        assertThat(sparkDestinationTableDTO1).isNotEqualTo(sparkDestinationTableDTO2);
        sparkDestinationTableDTO2.setId(sparkDestinationTableDTO1.getId());
        assertThat(sparkDestinationTableDTO1).isEqualTo(sparkDestinationTableDTO2);
        sparkDestinationTableDTO2.setId(2L);
        assertThat(sparkDestinationTableDTO1).isNotEqualTo(sparkDestinationTableDTO2);
        sparkDestinationTableDTO1.setId(null);
        assertThat(sparkDestinationTableDTO1).isNotEqualTo(sparkDestinationTableDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(sparkDestinationTableMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(sparkDestinationTableMapper.fromId(null)).isNull();
    }
}
