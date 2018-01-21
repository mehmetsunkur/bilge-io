package io.bilge.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.bilge.domain.DataColumn;

import io.bilge.repository.DataColumnRepository;
import io.bilge.web.rest.errors.BadRequestAlertException;
import io.bilge.web.rest.util.HeaderUtil;
import io.bilge.service.dto.DataColumnDTO;
import io.bilge.service.mapper.DataColumnMapper;
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
 * REST controller for managing DataColumn.
 */
@RestController
@RequestMapping("/api")
public class DataColumnResource {

    private final Logger log = LoggerFactory.getLogger(DataColumnResource.class);

    private static final String ENTITY_NAME = "dataColumn";

    private final DataColumnRepository dataColumnRepository;

    private final DataColumnMapper dataColumnMapper;

    public DataColumnResource(DataColumnRepository dataColumnRepository, DataColumnMapper dataColumnMapper) {
        this.dataColumnRepository = dataColumnRepository;
        this.dataColumnMapper = dataColumnMapper;
    }

    /**
     * POST  /data-columns : Create a new dataColumn.
     *
     * @param dataColumnDTO the dataColumnDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new dataColumnDTO, or with status 400 (Bad Request) if the dataColumn has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/data-columns")
    @Timed
    public ResponseEntity<DataColumnDTO> createDataColumn(@RequestBody DataColumnDTO dataColumnDTO) throws URISyntaxException {
        log.debug("REST request to save DataColumn : {}", dataColumnDTO);
        if (dataColumnDTO.getId() != null) {
            throw new BadRequestAlertException("A new dataColumn cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DataColumn dataColumn = dataColumnMapper.toEntity(dataColumnDTO);
        dataColumn = dataColumnRepository.save(dataColumn);
        DataColumnDTO result = dataColumnMapper.toDto(dataColumn);
        return ResponseEntity.created(new URI("/api/data-columns/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /data-columns : Updates an existing dataColumn.
     *
     * @param dataColumnDTO the dataColumnDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated dataColumnDTO,
     * or with status 400 (Bad Request) if the dataColumnDTO is not valid,
     * or with status 500 (Internal Server Error) if the dataColumnDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/data-columns")
    @Timed
    public ResponseEntity<DataColumnDTO> updateDataColumn(@RequestBody DataColumnDTO dataColumnDTO) throws URISyntaxException {
        log.debug("REST request to update DataColumn : {}", dataColumnDTO);
        if (dataColumnDTO.getId() == null) {
            return createDataColumn(dataColumnDTO);
        }
        DataColumn dataColumn = dataColumnMapper.toEntity(dataColumnDTO);
        dataColumn = dataColumnRepository.save(dataColumn);
        DataColumnDTO result = dataColumnMapper.toDto(dataColumn);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, dataColumnDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /data-columns : get all the dataColumns.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of dataColumns in body
     */
    @GetMapping("/data-columns")
    @Timed
    public List<DataColumnDTO> getAllDataColumns() {
        log.debug("REST request to get all DataColumns");
        List<DataColumn> dataColumns = dataColumnRepository.findAll();
        return dataColumnMapper.toDto(dataColumns);
        }

    /**
     * GET  /data-columns/:id : get the "id" dataColumn.
     *
     * @param id the id of the dataColumnDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the dataColumnDTO, or with status 404 (Not Found)
     */
    @GetMapping("/data-columns/{id}")
    @Timed
    public ResponseEntity<DataColumnDTO> getDataColumn(@PathVariable Long id) {
        log.debug("REST request to get DataColumn : {}", id);
        DataColumn dataColumn = dataColumnRepository.findOne(id);
        DataColumnDTO dataColumnDTO = dataColumnMapper.toDto(dataColumn);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(dataColumnDTO));
    }

    /**
     * DELETE  /data-columns/:id : delete the "id" dataColumn.
     *
     * @param id the id of the dataColumnDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/data-columns/{id}")
    @Timed
    public ResponseEntity<Void> deleteDataColumn(@PathVariable Long id) {
        log.debug("REST request to delete DataColumn : {}", id);
        dataColumnRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
