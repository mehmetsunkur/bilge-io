package io.bilge.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.bilge.domain.DataSchema;

import io.bilge.repository.DataSchemaRepository;
import io.bilge.web.rest.errors.BadRequestAlertException;
import io.bilge.web.rest.util.HeaderUtil;
import io.bilge.service.dto.DataSchemaDTO;
import io.bilge.service.mapper.DataSchemaMapper;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing DataSchema.
 */
@RestController
@RequestMapping("/api")
public class DataSchemaResource {

    private final Logger log = LoggerFactory.getLogger(DataSchemaResource.class);

    private static final String ENTITY_NAME = "dataSchema";

    private final DataSchemaRepository dataSchemaRepository;

    private final DataSchemaMapper dataSchemaMapper;

    public DataSchemaResource(DataSchemaRepository dataSchemaRepository, DataSchemaMapper dataSchemaMapper) {
        this.dataSchemaRepository = dataSchemaRepository;
        this.dataSchemaMapper = dataSchemaMapper;
    }

    /**
     * POST  /data-schemas : Create a new dataSchema.
     *
     * @param dataSchemaDTO the dataSchemaDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new dataSchemaDTO, or with status 400 (Bad Request) if the dataSchema has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/data-schemas")
    @Timed
    public ResponseEntity<DataSchemaDTO> createDataSchema(@RequestBody DataSchemaDTO dataSchemaDTO) throws URISyntaxException {
        log.debug("REST request to save DataSchema : {}", dataSchemaDTO);
        if (dataSchemaDTO.getId() != null) {
            throw new BadRequestAlertException("A new dataSchema cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DataSchema dataSchema = dataSchemaMapper.toEntity(dataSchemaDTO);
        dataSchema = dataSchemaRepository.save(dataSchema);
        DataSchemaDTO result = dataSchemaMapper.toDto(dataSchema);
        return ResponseEntity.created(new URI("/api/data-schemas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /data-schemas : Updates an existing dataSchema.
     *
     * @param dataSchemaDTO the dataSchemaDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated dataSchemaDTO,
     * or with status 400 (Bad Request) if the dataSchemaDTO is not valid,
     * or with status 500 (Internal Server Error) if the dataSchemaDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/data-schemas")
    @Timed
    public ResponseEntity<DataSchemaDTO> updateDataSchema(@RequestBody DataSchemaDTO dataSchemaDTO) throws URISyntaxException {
        log.debug("REST request to update DataSchema : {}", dataSchemaDTO);
        if (dataSchemaDTO.getId() == null) {
            return createDataSchema(dataSchemaDTO);
        }
        DataSchema dataSchema = dataSchemaMapper.toEntity(dataSchemaDTO);
        dataSchema = dataSchemaRepository.save(dataSchema);
        DataSchemaDTO result = dataSchemaMapper.toDto(dataSchema);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, dataSchemaDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /data-schemas : get all the dataSchemas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of dataSchemas in body
     */
    @GetMapping("/data-schemas")
    @Timed
    public List<DataSchemaDTO> getAllDataSchemas() {
        log.debug("REST request to get all DataSchemas");
        List<DataSchema> dataSchemas = dataSchemaRepository.findAll();
        return dataSchemaMapper.toDto(dataSchemas);
        }

    /**
     * GET  /data-schemas/:id : get the "id" dataSchema.
     *
     * @param id the id of the dataSchemaDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the dataSchemaDTO, or with status 404 (Not Found)
     */
    @GetMapping("/data-schemas/{id}")
    @Timed
    public ResponseEntity<DataSchemaDTO> getDataSchema(@PathVariable Long id) {
        log.debug("REST request to get DataSchema : {}", id);
        DataSchema dataSchema = dataSchemaRepository.findOne(id);
        DataSchemaDTO dataSchemaDTO = dataSchemaMapper.toDto(dataSchema);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(dataSchemaDTO));
    }

    /**
     * DELETE  /data-schemas/:id : delete the "id" dataSchema.
     *
     * @param id the id of the dataSchemaDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/data-schemas/{id}")
    @Timed
    public ResponseEntity<Void> deleteDataSchema(@PathVariable Long id) {
        log.debug("REST request to delete DataSchema : {}", id);
        dataSchemaRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
