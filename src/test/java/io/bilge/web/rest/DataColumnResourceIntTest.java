package io.bilge.web.rest;

import io.bilge.BilgeApp;

import io.bilge.domain.DataColumn;
import io.bilge.repository.DataColumnRepository;
import io.bilge.service.dto.DataColumnDTO;
import io.bilge.service.mapper.DataColumnMapper;
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
 * Test class for the DataColumnResource REST controller.
 *
 * @see DataColumnResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BilgeApp.class)
public class DataColumnResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final ColumnType DEFAULT_TYPE = ColumnType.CHAR;
    private static final ColumnType UPDATED_TYPE = ColumnType.VARCHAR;

    private static final Long DEFAULT_SIZE = 1L;
    private static final Long UPDATED_SIZE = 2L;

    private static final Boolean DEFAULT_NULLABLE = false;
    private static final Boolean UPDATED_NULLABLE = true;

    private static final String DEFAULT_REMARKS = "AAAAAAAAAA";
    private static final String UPDATED_REMARKS = "BBBBBBBBBB";

    private static final String DEFAULT_NATIVE_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_NATIVE_TYPE = "BBBBBBBBBB";

    private static final Boolean DEFAULT_INDEXED = false;
    private static final Boolean UPDATED_INDEXED = true;

    private static final Boolean DEFAULT_PRIMARY_KEY = false;
    private static final Boolean UPDATED_PRIMARY_KEY = true;

    @Autowired
    private DataColumnRepository dataColumnRepository;

    @Autowired
    private DataColumnMapper dataColumnMapper;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDataColumnMockMvc;

    private DataColumn dataColumn;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DataColumnResource dataColumnResource = new DataColumnResource(dataColumnRepository, dataColumnMapper);
        this.restDataColumnMockMvc = MockMvcBuilders.standaloneSetup(dataColumnResource)
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
    public static DataColumn createEntity(EntityManager em) {
        DataColumn dataColumn = new DataColumn()
            .name(DEFAULT_NAME)
            .type(DEFAULT_TYPE)
            .size(DEFAULT_SIZE)
            .nullable(DEFAULT_NULLABLE)
            .remarks(DEFAULT_REMARKS)
            .nativeType(DEFAULT_NATIVE_TYPE)
            .indexed(DEFAULT_INDEXED)
            .primaryKey(DEFAULT_PRIMARY_KEY);
        return dataColumn;
    }

    @Before
    public void initTest() {
        dataColumn = createEntity(em);
    }

    @Test
    @Transactional
    public void createDataColumn() throws Exception {
        int databaseSizeBeforeCreate = dataColumnRepository.findAll().size();

        // Create the DataColumn
        DataColumnDTO dataColumnDTO = dataColumnMapper.toDto(dataColumn);
        restDataColumnMockMvc.perform(post("/api/data-columns")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dataColumnDTO)))
            .andExpect(status().isCreated());

        // Validate the DataColumn in the database
        List<DataColumn> dataColumnList = dataColumnRepository.findAll();
        assertThat(dataColumnList).hasSize(databaseSizeBeforeCreate + 1);
        DataColumn testDataColumn = dataColumnList.get(dataColumnList.size() - 1);
        assertThat(testDataColumn.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testDataColumn.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testDataColumn.getSize()).isEqualTo(DEFAULT_SIZE);
        assertThat(testDataColumn.isNullable()).isEqualTo(DEFAULT_NULLABLE);
        assertThat(testDataColumn.getRemarks()).isEqualTo(DEFAULT_REMARKS);
        assertThat(testDataColumn.getNativeType()).isEqualTo(DEFAULT_NATIVE_TYPE);
        assertThat(testDataColumn.isIndexed()).isEqualTo(DEFAULT_INDEXED);
        assertThat(testDataColumn.isPrimaryKey()).isEqualTo(DEFAULT_PRIMARY_KEY);
    }

    @Test
    @Transactional
    public void createDataColumnWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = dataColumnRepository.findAll().size();

        // Create the DataColumn with an existing ID
        dataColumn.setId(1L);
        DataColumnDTO dataColumnDTO = dataColumnMapper.toDto(dataColumn);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDataColumnMockMvc.perform(post("/api/data-columns")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dataColumnDTO)))
            .andExpect(status().isBadRequest());

        // Validate the DataColumn in the database
        List<DataColumn> dataColumnList = dataColumnRepository.findAll();
        assertThat(dataColumnList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDataColumns() throws Exception {
        // Initialize the database
        dataColumnRepository.saveAndFlush(dataColumn);

        // Get all the dataColumnList
        restDataColumnMockMvc.perform(get("/api/data-columns?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dataColumn.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].size").value(hasItem(DEFAULT_SIZE.intValue())))
            .andExpect(jsonPath("$.[*].nullable").value(hasItem(DEFAULT_NULLABLE.booleanValue())))
            .andExpect(jsonPath("$.[*].remarks").value(hasItem(DEFAULT_REMARKS.toString())))
            .andExpect(jsonPath("$.[*].nativeType").value(hasItem(DEFAULT_NATIVE_TYPE.toString())))
            .andExpect(jsonPath("$.[*].indexed").value(hasItem(DEFAULT_INDEXED.booleanValue())))
            .andExpect(jsonPath("$.[*].primaryKey").value(hasItem(DEFAULT_PRIMARY_KEY.booleanValue())));
    }

    @Test
    @Transactional
    public void getDataColumn() throws Exception {
        // Initialize the database
        dataColumnRepository.saveAndFlush(dataColumn);

        // Get the dataColumn
        restDataColumnMockMvc.perform(get("/api/data-columns/{id}", dataColumn.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(dataColumn.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.size").value(DEFAULT_SIZE.intValue()))
            .andExpect(jsonPath("$.nullable").value(DEFAULT_NULLABLE.booleanValue()))
            .andExpect(jsonPath("$.remarks").value(DEFAULT_REMARKS.toString()))
            .andExpect(jsonPath("$.nativeType").value(DEFAULT_NATIVE_TYPE.toString()))
            .andExpect(jsonPath("$.indexed").value(DEFAULT_INDEXED.booleanValue()))
            .andExpect(jsonPath("$.primaryKey").value(DEFAULT_PRIMARY_KEY.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingDataColumn() throws Exception {
        // Get the dataColumn
        restDataColumnMockMvc.perform(get("/api/data-columns/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDataColumn() throws Exception {
        // Initialize the database
        dataColumnRepository.saveAndFlush(dataColumn);
        int databaseSizeBeforeUpdate = dataColumnRepository.findAll().size();

        // Update the dataColumn
        DataColumn updatedDataColumn = dataColumnRepository.findOne(dataColumn.getId());
        // Disconnect from session so that the updates on updatedDataColumn are not directly saved in db
        em.detach(updatedDataColumn);
        updatedDataColumn
            .name(UPDATED_NAME)
            .type(UPDATED_TYPE)
            .size(UPDATED_SIZE)
            .nullable(UPDATED_NULLABLE)
            .remarks(UPDATED_REMARKS)
            .nativeType(UPDATED_NATIVE_TYPE)
            .indexed(UPDATED_INDEXED)
            .primaryKey(UPDATED_PRIMARY_KEY);
        DataColumnDTO dataColumnDTO = dataColumnMapper.toDto(updatedDataColumn);

        restDataColumnMockMvc.perform(put("/api/data-columns")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dataColumnDTO)))
            .andExpect(status().isOk());

        // Validate the DataColumn in the database
        List<DataColumn> dataColumnList = dataColumnRepository.findAll();
        assertThat(dataColumnList).hasSize(databaseSizeBeforeUpdate);
        DataColumn testDataColumn = dataColumnList.get(dataColumnList.size() - 1);
        assertThat(testDataColumn.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testDataColumn.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testDataColumn.getSize()).isEqualTo(UPDATED_SIZE);
        assertThat(testDataColumn.isNullable()).isEqualTo(UPDATED_NULLABLE);
        assertThat(testDataColumn.getRemarks()).isEqualTo(UPDATED_REMARKS);
        assertThat(testDataColumn.getNativeType()).isEqualTo(UPDATED_NATIVE_TYPE);
        assertThat(testDataColumn.isIndexed()).isEqualTo(UPDATED_INDEXED);
        assertThat(testDataColumn.isPrimaryKey()).isEqualTo(UPDATED_PRIMARY_KEY);
    }

    @Test
    @Transactional
    public void updateNonExistingDataColumn() throws Exception {
        int databaseSizeBeforeUpdate = dataColumnRepository.findAll().size();

        // Create the DataColumn
        DataColumnDTO dataColumnDTO = dataColumnMapper.toDto(dataColumn);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDataColumnMockMvc.perform(put("/api/data-columns")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dataColumnDTO)))
            .andExpect(status().isCreated());

        // Validate the DataColumn in the database
        List<DataColumn> dataColumnList = dataColumnRepository.findAll();
        assertThat(dataColumnList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDataColumn() throws Exception {
        // Initialize the database
        dataColumnRepository.saveAndFlush(dataColumn);
        int databaseSizeBeforeDelete = dataColumnRepository.findAll().size();

        // Get the dataColumn
        restDataColumnMockMvc.perform(delete("/api/data-columns/{id}", dataColumn.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DataColumn> dataColumnList = dataColumnRepository.findAll();
        assertThat(dataColumnList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DataColumn.class);
        DataColumn dataColumn1 = new DataColumn();
        dataColumn1.setId(1L);
        DataColumn dataColumn2 = new DataColumn();
        dataColumn2.setId(dataColumn1.getId());
        assertThat(dataColumn1).isEqualTo(dataColumn2);
        dataColumn2.setId(2L);
        assertThat(dataColumn1).isNotEqualTo(dataColumn2);
        dataColumn1.setId(null);
        assertThat(dataColumn1).isNotEqualTo(dataColumn2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DataColumnDTO.class);
        DataColumnDTO dataColumnDTO1 = new DataColumnDTO();
        dataColumnDTO1.setId(1L);
        DataColumnDTO dataColumnDTO2 = new DataColumnDTO();
        assertThat(dataColumnDTO1).isNotEqualTo(dataColumnDTO2);
        dataColumnDTO2.setId(dataColumnDTO1.getId());
        assertThat(dataColumnDTO1).isEqualTo(dataColumnDTO2);
        dataColumnDTO2.setId(2L);
        assertThat(dataColumnDTO1).isNotEqualTo(dataColumnDTO2);
        dataColumnDTO1.setId(null);
        assertThat(dataColumnDTO1).isNotEqualTo(dataColumnDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(dataColumnMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(dataColumnMapper.fromId(null)).isNull();
    }
}
