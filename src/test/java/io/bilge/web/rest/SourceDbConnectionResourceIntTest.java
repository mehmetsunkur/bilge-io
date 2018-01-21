package io.bilge.web.rest;

import io.bilge.BilgeApp;

import io.bilge.domain.SourceDbConnection;
import io.bilge.repository.SourceDbConnectionRepository;
import io.bilge.service.dto.SourceDbConnectionDTO;
import io.bilge.service.mapper.SourceDbConnectionMapper;
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
 * Test class for the SourceDbConnectionResource REST controller.
 *
 * @see SourceDbConnectionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BilgeApp.class)
public class SourceDbConnectionResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_URL = "AAAAAAAAAA";
    private static final String UPDATED_URL = "BBBBBBBBBB";

    private static final String DEFAULT_USER = "AAAAAAAAAA";
    private static final String UPDATED_USER = "BBBBBBBBBB";

    private static final String DEFAULT_PASS = "AAAAAAAAAA";
    private static final String UPDATED_PASS = "BBBBBBBBBB";

    private static final String DEFAULT_DB_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_DB_TYPE = "BBBBBBBBBB";

    @Autowired
    private SourceDbConnectionRepository sourceDbConnectionRepository;

    @Autowired
    private SourceDbConnectionMapper sourceDbConnectionMapper;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSourceDbConnectionMockMvc;

    private SourceDbConnection sourceDbConnection;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SourceDbConnectionResource sourceDbConnectionResource = new SourceDbConnectionResource(sourceDbConnectionRepository, sourceDbConnectionMapper);
        this.restSourceDbConnectionMockMvc = MockMvcBuilders.standaloneSetup(sourceDbConnectionResource)
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
    public static SourceDbConnection createEntity(EntityManager em) {
        SourceDbConnection sourceDbConnection = new SourceDbConnection()
            .name(DEFAULT_NAME)
            .url(DEFAULT_URL)
            .user(DEFAULT_USER)
            .pass(DEFAULT_PASS)
            .dbType(DEFAULT_DB_TYPE);
        return sourceDbConnection;
    }

    @Before
    public void initTest() {
        sourceDbConnection = createEntity(em);
    }

    @Test
    @Transactional
    public void createSourceDbConnection() throws Exception {
        int databaseSizeBeforeCreate = sourceDbConnectionRepository.findAll().size();

        // Create the SourceDbConnection
        SourceDbConnectionDTO sourceDbConnectionDTO = sourceDbConnectionMapper.toDto(sourceDbConnection);
        restSourceDbConnectionMockMvc.perform(post("/api/source-db-connections")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sourceDbConnectionDTO)))
            .andExpect(status().isCreated());

        // Validate the SourceDbConnection in the database
        List<SourceDbConnection> sourceDbConnectionList = sourceDbConnectionRepository.findAll();
        assertThat(sourceDbConnectionList).hasSize(databaseSizeBeforeCreate + 1);
        SourceDbConnection testSourceDbConnection = sourceDbConnectionList.get(sourceDbConnectionList.size() - 1);
        assertThat(testSourceDbConnection.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testSourceDbConnection.getUrl()).isEqualTo(DEFAULT_URL);
        assertThat(testSourceDbConnection.getUser()).isEqualTo(DEFAULT_USER);
        assertThat(testSourceDbConnection.getPass()).isEqualTo(DEFAULT_PASS);
        assertThat(testSourceDbConnection.getDbType()).isEqualTo(DEFAULT_DB_TYPE);
    }

    @Test
    @Transactional
    public void createSourceDbConnectionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sourceDbConnectionRepository.findAll().size();

        // Create the SourceDbConnection with an existing ID
        sourceDbConnection.setId(1L);
        SourceDbConnectionDTO sourceDbConnectionDTO = sourceDbConnectionMapper.toDto(sourceDbConnection);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSourceDbConnectionMockMvc.perform(post("/api/source-db-connections")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sourceDbConnectionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SourceDbConnection in the database
        List<SourceDbConnection> sourceDbConnectionList = sourceDbConnectionRepository.findAll();
        assertThat(sourceDbConnectionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSourceDbConnections() throws Exception {
        // Initialize the database
        sourceDbConnectionRepository.saveAndFlush(sourceDbConnection);

        // Get all the sourceDbConnectionList
        restSourceDbConnectionMockMvc.perform(get("/api/source-db-connections?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sourceDbConnection.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL.toString())))
            .andExpect(jsonPath("$.[*].user").value(hasItem(DEFAULT_USER.toString())))
            .andExpect(jsonPath("$.[*].pass").value(hasItem(DEFAULT_PASS.toString())))
            .andExpect(jsonPath("$.[*].dbType").value(hasItem(DEFAULT_DB_TYPE.toString())));
    }

    @Test
    @Transactional
    public void getSourceDbConnection() throws Exception {
        // Initialize the database
        sourceDbConnectionRepository.saveAndFlush(sourceDbConnection);

        // Get the sourceDbConnection
        restSourceDbConnectionMockMvc.perform(get("/api/source-db-connections/{id}", sourceDbConnection.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(sourceDbConnection.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.url").value(DEFAULT_URL.toString()))
            .andExpect(jsonPath("$.user").value(DEFAULT_USER.toString()))
            .andExpect(jsonPath("$.pass").value(DEFAULT_PASS.toString()))
            .andExpect(jsonPath("$.dbType").value(DEFAULT_DB_TYPE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSourceDbConnection() throws Exception {
        // Get the sourceDbConnection
        restSourceDbConnectionMockMvc.perform(get("/api/source-db-connections/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSourceDbConnection() throws Exception {
        // Initialize the database
        sourceDbConnectionRepository.saveAndFlush(sourceDbConnection);
        int databaseSizeBeforeUpdate = sourceDbConnectionRepository.findAll().size();

        // Update the sourceDbConnection
        SourceDbConnection updatedSourceDbConnection = sourceDbConnectionRepository.findOne(sourceDbConnection.getId());
        // Disconnect from session so that the updates on updatedSourceDbConnection are not directly saved in db
        em.detach(updatedSourceDbConnection);
        updatedSourceDbConnection
            .name(UPDATED_NAME)
            .url(UPDATED_URL)
            .user(UPDATED_USER)
            .pass(UPDATED_PASS)
            .dbType(UPDATED_DB_TYPE);
        SourceDbConnectionDTO sourceDbConnectionDTO = sourceDbConnectionMapper.toDto(updatedSourceDbConnection);

        restSourceDbConnectionMockMvc.perform(put("/api/source-db-connections")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sourceDbConnectionDTO)))
            .andExpect(status().isOk());

        // Validate the SourceDbConnection in the database
        List<SourceDbConnection> sourceDbConnectionList = sourceDbConnectionRepository.findAll();
        assertThat(sourceDbConnectionList).hasSize(databaseSizeBeforeUpdate);
        SourceDbConnection testSourceDbConnection = sourceDbConnectionList.get(sourceDbConnectionList.size() - 1);
        assertThat(testSourceDbConnection.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testSourceDbConnection.getUrl()).isEqualTo(UPDATED_URL);
        assertThat(testSourceDbConnection.getUser()).isEqualTo(UPDATED_USER);
        assertThat(testSourceDbConnection.getPass()).isEqualTo(UPDATED_PASS);
        assertThat(testSourceDbConnection.getDbType()).isEqualTo(UPDATED_DB_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingSourceDbConnection() throws Exception {
        int databaseSizeBeforeUpdate = sourceDbConnectionRepository.findAll().size();

        // Create the SourceDbConnection
        SourceDbConnectionDTO sourceDbConnectionDTO = sourceDbConnectionMapper.toDto(sourceDbConnection);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSourceDbConnectionMockMvc.perform(put("/api/source-db-connections")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sourceDbConnectionDTO)))
            .andExpect(status().isCreated());

        // Validate the SourceDbConnection in the database
        List<SourceDbConnection> sourceDbConnectionList = sourceDbConnectionRepository.findAll();
        assertThat(sourceDbConnectionList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSourceDbConnection() throws Exception {
        // Initialize the database
        sourceDbConnectionRepository.saveAndFlush(sourceDbConnection);
        int databaseSizeBeforeDelete = sourceDbConnectionRepository.findAll().size();

        // Get the sourceDbConnection
        restSourceDbConnectionMockMvc.perform(delete("/api/source-db-connections/{id}", sourceDbConnection.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SourceDbConnection> sourceDbConnectionList = sourceDbConnectionRepository.findAll();
        assertThat(sourceDbConnectionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SourceDbConnection.class);
        SourceDbConnection sourceDbConnection1 = new SourceDbConnection();
        sourceDbConnection1.setId(1L);
        SourceDbConnection sourceDbConnection2 = new SourceDbConnection();
        sourceDbConnection2.setId(sourceDbConnection1.getId());
        assertThat(sourceDbConnection1).isEqualTo(sourceDbConnection2);
        sourceDbConnection2.setId(2L);
        assertThat(sourceDbConnection1).isNotEqualTo(sourceDbConnection2);
        sourceDbConnection1.setId(null);
        assertThat(sourceDbConnection1).isNotEqualTo(sourceDbConnection2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SourceDbConnectionDTO.class);
        SourceDbConnectionDTO sourceDbConnectionDTO1 = new SourceDbConnectionDTO();
        sourceDbConnectionDTO1.setId(1L);
        SourceDbConnectionDTO sourceDbConnectionDTO2 = new SourceDbConnectionDTO();
        assertThat(sourceDbConnectionDTO1).isNotEqualTo(sourceDbConnectionDTO2);
        sourceDbConnectionDTO2.setId(sourceDbConnectionDTO1.getId());
        assertThat(sourceDbConnectionDTO1).isEqualTo(sourceDbConnectionDTO2);
        sourceDbConnectionDTO2.setId(2L);
        assertThat(sourceDbConnectionDTO1).isNotEqualTo(sourceDbConnectionDTO2);
        sourceDbConnectionDTO1.setId(null);
        assertThat(sourceDbConnectionDTO1).isNotEqualTo(sourceDbConnectionDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(sourceDbConnectionMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(sourceDbConnectionMapper.fromId(null)).isNull();
    }
}
