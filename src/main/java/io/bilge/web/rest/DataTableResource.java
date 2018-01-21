package io.bilge.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.bilge.domain.DataTable;

import io.bilge.repository.DataTableRepository;
import io.bilge.web.rest.errors.BadRequestAlertException;
import io.bilge.web.rest.util.HeaderUtil;
import io.bilge.service.dto.DataTableDTO;
import io.bilge.service.mapper.DataTableMapper;
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
 * REST controller for managing DataTable.
 */
@RestController
@RequestMapping("/api")
public class DataTableResource {

    private final Logger log = LoggerFactory.getLogger(DataTableResource.class);

    private static final String ENTITY_NAME = "dataTable";

    private final DataTableRepository dataTableRepository;

    private final DataTableMapper dataTableMapper;

    public DataTableResource(DataTableRepository dataTableRepository, DataTableMapper dataTableMapper) {
        this.dataTableRepository = dataTableRepository;
        this.dataTableMapper = dataTableMapper;
    }

    /**
     * POST  /data-tables : Create a new dataTable.
     *
     * @param dataTableDTO the dataTableDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new dataTableDTO, or with status 400 (Bad Request) if the dataTable has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/data-tables")
    @Timed
    public ResponseEntity<DataTableDTO> createDataTable(@RequestBody DataTableDTO dataTableDTO) throws URISyntaxException {
        log.debug("REST request to save DataTable : {}", dataTableDTO);
        if (dataTableDTO.getId() != null) {
            throw new BadRequestAlertException("A new dataTable cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DataTable dataTable = dataTableMapper.toEntity(dataTableDTO);
        dataTable = dataTableRepository.save(dataTable);
        DataTableDTO result = dataTableMapper.toDto(dataTable);
        return ResponseEntity.created(new URI("/api/data-tables/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /data-tables : Updates an existing dataTable.
     *
     * @param dataTableDTO the dataTableDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated dataTableDTO,
     * or with status 400 (Bad Request) if the dataTableDTO is not valid,
     * or with status 500 (Internal Server Error) if the dataTableDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/data-tables")
    @Timed
    public ResponseEntity<DataTableDTO> updateDataTable(@RequestBody DataTableDTO dataTableDTO) throws URISyntaxException {
        log.debug("REST request to update DataTable : {}", dataTableDTO);
        if (dataTableDTO.getId() == null) {
            return createDataTable(dataTableDTO);
        }
        DataTable dataTable = dataTableMapper.toEntity(dataTableDTO);
        dataTable = dataTableRepository.save(dataTable);
        DataTableDTO result = dataTableMapper.toDto(dataTable);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, dataTableDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /data-tables : get all the dataTables.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of dataTables in body
     */
    @GetMapping("/data-tables")
    @Timed
    public List<DataTableDTO> getAllDataTables() {
        log.debug("REST request to get all DataTables");
        List<DataTable> dataTables = dataTableRepository.findAll();
        return dataTableMapper.toDto(dataTables);
        }

    /**
     * GET  /data-tables/:id : get the "id" dataTable.
     *
     * @param id the id of the dataTableDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the dataTableDTO, or with status 404 (Not Found)
     */
    @GetMapping("/data-tables/{id}")
    @Timed
    public ResponseEntity<DataTableDTO> getDataTable(@PathVariable Long id) {
        log.debug("REST request to get DataTable : {}", id);
        DataTable dataTable = dataTableRepository.findOne(id);
        DataTableDTO dataTableDTO = dataTableMapper.toDto(dataTable);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(dataTableDTO));
    }

    /**
     * DELETE  /data-tables/:id : delete the "id" dataTable.
     *
     * @param id the id of the dataTableDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/data-tables/{id}")
    @Timed
    public ResponseEntity<Void> deleteDataTable(@PathVariable Long id) {
        log.debug("REST request to delete DataTable : {}", id);
        dataTableRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
