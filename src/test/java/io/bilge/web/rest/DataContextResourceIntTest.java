package io.bilge.web.rest;

import io.bilge.BilgeApp;

import io.bilge.domain.DataContext;
import io.bilge.repository.DataContextRepository;
import io.bilge.service.dto.DataContextDTO;
import io.bilge.service.mapper.DataContextMapper;
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
 * Test class for the DataContextResource REST controller.
 *
 * @see DataContextResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BilgeApp.class)
public class DataContextResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private DataContextRepository dataContextRepository;

    @Autowired
    private DataContextMapper dataContextMapper;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDataContextMockMvc;

    private DataContext dataContext;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DataContextResource dataContextResource = new DataContextResource(dataContextRepository, dataContextMapper);
        this.restDataContextMockMvc = MockMvcBuilders.standaloneSetup(dataContextResource)
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
    public static DataContext createEntity(EntityManager em) {
        DataContext dataContext = new DataContext()
            .name(DEFAULT_NAME);
        return dataContext;
    }

    @Before
    public void initTest() {
        dataContext = createEntity(em);
    }

    @Test
    @Transactional
    public void createDataContext() throws Exception {
        int databaseSizeBeforeCreate = dataContextRepository.findAll().size();

        // Create the DataContext
        DataContextDTO dataContextDTO = dataContextMapper.toDto(dataContext);
        restDataContextMockMvc.perform(post("/api/data-contexts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dataContextDTO)))
            .andExpect(status().isCreated());

        // Validate the DataContext in the database
        List<DataContext> dataContextList = dataContextRepository.findAll();
        assertThat(dataContextList).hasSize(databaseSizeBeforeCreate + 1);
        DataContext testDataContext = dataContextList.get(dataContextList.size() - 1);
        assertThat(testDataContext.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createDataContextWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = dataContextRepository.findAll().size();

        // Create the DataContext with an existing ID
        dataContext.setId(1L);
        DataContextDTO dataContextDTO = dataContextMapper.toDto(dataContext);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDataContextMockMvc.perform(post("/api/data-contexts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dataContextDTO)))
            .andExpect(status().isBadRequest());

        // Validate the DataContext in the database
        List<DataContext> dataContextList = dataContextRepository.findAll();
        assertThat(dataContextList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDataContexts() throws Exception {
        // Initialize the database
        dataContextRepository.saveAndFlush(dataContext);

        // Get all the dataContextList
        restDataContextMockMvc.perform(get("/api/data-contexts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dataContext.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getDataContext() throws Exception {
        // Initialize the database
        dataContextRepository.saveAndFlush(dataContext);

        // Get the dataContext
        restDataContextMockMvc.perform(get("/api/data-contexts/{id}", dataContext.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(dataContext.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDataContext() throws Exception {
        // Get the dataContext
        restDataContextMockMvc.perform(get("/api/data-contexts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDataContext() throws Exception {
        // Initialize the database
        dataContextRepository.saveAndFlush(dataContext);
        int databaseSizeBeforeUpdate = dataContextRepository.findAll().size();

        // Update the dataContext
        DataContext updatedDataContext = dataContextRepository.findOne(dataContext.getId());
        // Disconnect from session so that the updates on updatedDataContext are not directly saved in db
        em.detach(updatedDataContext);
        updatedDataContext
            .name(UPDATED_NAME);
        DataContextDTO dataContextDTO = dataContextMapper.toDto(updatedDataContext);

        restDataContextMockMvc.perform(put("/api/data-contexts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dataContextDTO)))
            .andExpect(status().isOk());

        // Validate the DataContext in the database
        List<DataContext> dataContextList = dataContextRepository.findAll();
        assertThat(dataContextList).hasSize(databaseSizeBeforeUpdate);
        DataContext testDataContext = dataContextList.get(dataContextList.size() - 1);
        assertThat(testDataContext.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingDataContext() throws Exception {
        int databaseSizeBeforeUpdate = dataContextRepository.findAll().size();

        // Create the DataContext
        DataContextDTO dataContextDTO = dataContextMapper.toDto(dataContext);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDataContextMockMvc.perform(put("/api/data-contexts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dataContextDTO)))
            .andExpect(status().isCreated());

        // Validate the DataContext in the database
        List<DataContext> dataContextList = dataContextRepository.findAll();
        assertThat(dataContextList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDataContext() throws Exception {
        // Initialize the database
        dataContextRepository.saveAndFlush(dataContext);
        int databaseSizeBeforeDelete = dataContextRepository.findAll().size();

        // Get the dataContext
        restDataContextMockMvc.perform(delete("/api/data-contexts/{id}", dataContext.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DataContext> dataContextList = dataContextRepository.findAll();
        assertThat(dataContextList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DataContext.class);
        DataContext dataContext1 = new DataContext();
        dataContext1.setId(1L);
        DataContext dataContext2 = new DataContext();
        dataContext2.setId(dataContext1.getId());
        assertThat(dataContext1).isEqualTo(dataContext2);
        dataContext2.setId(2L);
        assertThat(dataContext1).isNotEqualTo(dataContext2);
        dataContext1.setId(null);
        assertThat(dataContext1).isNotEqualTo(dataContext2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DataContextDTO.class);
        DataContextDTO dataContextDTO1 = new DataContextDTO();
        dataContextDTO1.setId(1L);
        DataContextDTO dataContextDTO2 = new DataContextDTO();
        assertThat(dataContextDTO1).isNotEqualTo(dataContextDTO2);
        dataContextDTO2.setId(dataContextDTO1.getId());
        assertThat(dataContextDTO1).isEqualTo(dataContextDTO2);
        dataContextDTO2.setId(2L);
        assertThat(dataContextDTO1).isNotEqualTo(dataContextDTO2);
        dataContextDTO1.setId(null);
        assertThat(dataContextDTO1).isNotEqualTo(dataContextDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(dataContextMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(dataContextMapper.fromId(null)).isNull();
    }
}
