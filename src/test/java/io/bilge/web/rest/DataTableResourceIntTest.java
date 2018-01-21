package io.bilge.web.rest;

import io.bilge.BilgeApp;

import io.bilge.domain.DataTable;
import io.bilge.repository.DataTableRepository;
import io.bilge.service.dto.DataTableDTO;
import io.bilge.service.mapper.DataTableMapper;
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
 * Test class for the DataTableResource REST controller.
 *
 * @see DataTableResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BilgeApp.class)
public class DataTableResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Long DEFAULT_COLUMN_COUNT = 1L;
    private static final Long UPDATED_COLUMN_COUNT = 2L;

    @Autowired
    private DataTableRepository dataTableRepository;

    @Autowired
    private DataTableMapper dataTableMapper;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDataTableMockMvc;

    private DataTable dataTable;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DataTableResource dataTableResource = new DataTableResource(dataTableRepository, dataTableMapper);
        this.restDataTableMockMvc = MockMvcBuilders.standaloneSetup(dataTableResource)
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
    public static DataTable createEntity(EntityManager em) {
        DataTable dataTable = new DataTable()
            .name(DEFAULT_NAME)
            .columnCount(DEFAULT_COLUMN_COUNT);
        return dataTable;
    }

    @Before
    public void initTest() {
        dataTable = createEntity(em);
    }

    @Test
    @Transactional
    public void createDataTable() throws Exception {
        int databaseSizeBeforeCreate = dataTableRepository.findAll().size();

        // Create the DataTable
        DataTableDTO dataTableDTO = dataTableMapper.toDto(dataTable);
        restDataTableMockMvc.perform(post("/api/data-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dataTableDTO)))
            .andExpect(status().isCreated());

        // Validate the DataTable in the database
        List<DataTable> dataTableList = dataTableRepository.findAll();
        assertThat(dataTableList).hasSize(databaseSizeBeforeCreate + 1);
        DataTable testDataTable = dataTableList.get(dataTableList.size() - 1);
        assertThat(testDataTable.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testDataTable.getColumnCount()).isEqualTo(DEFAULT_COLUMN_COUNT);
    }

    @Test
    @Transactional
    public void createDataTableWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = dataTableRepository.findAll().size();

        // Create the DataTable with an existing ID
        dataTable.setId(1L);
        DataTableDTO dataTableDTO = dataTableMapper.toDto(dataTable);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDataTableMockMvc.perform(post("/api/data-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dataTableDTO)))
            .andExpect(status().isBadRequest());

        // Validate the DataTable in the database
        List<DataTable> dataTableList = dataTableRepository.findAll();
        assertThat(dataTableList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDataTables() throws Exception {
        // Initialize the database
        dataTableRepository.saveAndFlush(dataTable);

        // Get all the dataTableList
        restDataTableMockMvc.perform(get("/api/data-tables?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dataTable.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].columnCount").value(hasItem(DEFAULT_COLUMN_COUNT.intValue())));
    }

    @Test
    @Transactional
    public void getDataTable() throws Exception {
        // Initialize the database
        dataTableRepository.saveAndFlush(dataTable);

        // Get the dataTable
        restDataTableMockMvc.perform(get("/api/data-tables/{id}", dataTable.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(dataTable.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.columnCount").value(DEFAULT_COLUMN_COUNT.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingDataTable() throws Exception {
        // Get the dataTable
        restDataTableMockMvc.perform(get("/api/data-tables/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDataTable() throws Exception {
        // Initialize the database
        dataTableRepository.saveAndFlush(dataTable);
        int databaseSizeBeforeUpdate = dataTableRepository.findAll().size();

        // Update the dataTable
        DataTable updatedDataTable = dataTableRepository.findOne(dataTable.getId());
        // Disconnect from session so that the updates on updatedDataTable are not directly saved in db
        em.detach(updatedDataTable);
        updatedDataTable
            .name(UPDATED_NAME)
            .columnCount(UPDATED_COLUMN_COUNT);
        DataTableDTO dataTableDTO = dataTableMapper.toDto(updatedDataTable);

        restDataTableMockMvc.perform(put("/api/data-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dataTableDTO)))
            .andExpect(status().isOk());

        // Validate the DataTable in the database
        List<DataTable> dataTableList = dataTableRepository.findAll();
        assertThat(dataTableList).hasSize(databaseSizeBeforeUpdate);
        DataTable testDataTable = dataTableList.get(dataTableList.size() - 1);
        assertThat(testDataTable.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testDataTable.getColumnCount()).isEqualTo(UPDATED_COLUMN_COUNT);
    }

    @Test
    @Transactional
    public void updateNonExistingDataTable() throws Exception {
        int databaseSizeBeforeUpdate = dataTableRepository.findAll().size();

        // Create the DataTable
        DataTableDTO dataTableDTO = dataTableMapper.toDto(dataTable);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDataTableMockMvc.perform(put("/api/data-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dataTableDTO)))
            .andExpect(status().isCreated());

        // Validate the DataTable in the database
        List<DataTable> dataTableList = dataTableRepository.findAll();
        assertThat(dataTableList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDataTable() throws Exception {
        // Initialize the database
        dataTableRepository.saveAndFlush(dataTable);
        int databaseSizeBeforeDelete = dataTableRepository.findAll().size();

        // Get the dataTable
        restDataTableMockMvc.perform(delete("/api/data-tables/{id}", dataTable.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DataTable> dataTableList = dataTableRepository.findAll();
        assertThat(dataTableList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DataTable.class);
        DataTable dataTable1 = new DataTable();
        dataTable1.setId(1L);
        DataTable dataTable2 = new DataTable();
        dataTable2.setId(dataTable1.getId());
        assertThat(dataTable1).isEqualTo(dataTable2);
        dataTable2.setId(2L);
        assertThat(dataTable1).isNotEqualTo(dataTable2);
        dataTable1.setId(null);
        assertThat(dataTable1).isNotEqualTo(dataTable2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DataTableDTO.class);
        DataTableDTO dataTableDTO1 = new DataTableDTO();
        dataTableDTO1.setId(1L);
        DataTableDTO dataTableDTO2 = new DataTableDTO();
        assertThat(dataTableDTO1).isNotEqualTo(dataTableDTO2);
        dataTableDTO2.setId(dataTableDTO1.getId());
        assertThat(dataTableDTO1).isEqualTo(dataTableDTO2);
        dataTableDTO2.setId(2L);
        assertThat(dataTableDTO1).isNotEqualTo(dataTableDTO2);
        dataTableDTO1.setId(null);
        assertThat(dataTableDTO1).isNotEqualTo(dataTableDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(dataTableMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(dataTableMapper.fromId(null)).isNull();
    }
}
