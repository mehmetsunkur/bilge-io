package io.bilge.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.bilge.domain.SparkDestinationTable;

import io.bilge.repository.SparkDestinationTableRepository;
import io.bilge.web.rest.errors.BadRequestAlertException;
import io.bilge.web.rest.util.HeaderUtil;
import io.bilge.service.dto.SparkDestinationTableDTO;
import io.bilge.service.mapper.SparkDestinationTableMapper;
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
 * REST controller for managing SparkDestinationTable.
 */
@RestController
@RequestMapping("/api")
public class SparkDestinationTableResource {

    private final Logger log = LoggerFactory.getLogger(SparkDestinationTableResource.class);

    private static final String ENTITY_NAME = "sparkDestinationTable";

    private final SparkDestinationTableRepository sparkDestinationTableRepository;

    private final SparkDestinationTableMapper sparkDestinationTableMapper;

    public SparkDestinationTableResource(SparkDestinationTableRepository sparkDestinationTableRepository, SparkDestinationTableMapper sparkDestinationTableMapper) {
        this.sparkDestinationTableRepository = sparkDestinationTableRepository;
        this.sparkDestinationTableMapper = sparkDestinationTableMapper;
    }

    /**
     * POST  /spark-destination-tables : Create a new sparkDestinationTable.
     *
     * @param sparkDestinationTableDTO the sparkDestinationTableDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new sparkDestinationTableDTO, or with status 400 (Bad Request) if the sparkDestinationTable has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/spark-destination-tables")
    @Timed
    public ResponseEntity<SparkDestinationTableDTO> createSparkDestinationTable(@RequestBody SparkDestinationTableDTO sparkDestinationTableDTO) throws URISyntaxException {
        log.debug("REST request to save SparkDestinationTable : {}", sparkDestinationTableDTO);
        if (sparkDestinationTableDTO.getId() != null) {
            throw new BadRequestAlertException("A new sparkDestinationTable cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SparkDestinationTable sparkDestinationTable = sparkDestinationTableMapper.toEntity(sparkDestinationTableDTO);
        sparkDestinationTable = sparkDestinationTableRepository.save(sparkDestinationTable);
        SparkDestinationTableDTO result = sparkDestinationTableMapper.toDto(sparkDestinationTable);
        return ResponseEntity.created(new URI("/api/spark-destination-tables/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /spark-destination-tables : Updates an existing sparkDestinationTable.
     *
     * @param sparkDestinationTableDTO the sparkDestinationTableDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated sparkDestinationTableDTO,
     * or with status 400 (Bad Request) if the sparkDestinationTableDTO is not valid,
     * or with status 500 (Internal Server Error) if the sparkDestinationTableDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/spark-destination-tables")
    @Timed
    public ResponseEntity<SparkDestinationTableDTO> updateSparkDestinationTable(@RequestBody SparkDestinationTableDTO sparkDestinationTableDTO) throws URISyntaxException {
        log.debug("REST request to update SparkDestinationTable : {}", sparkDestinationTableDTO);
        if (sparkDestinationTableDTO.getId() == null) {
            return createSparkDestinationTable(sparkDestinationTableDTO);
        }
        SparkDestinationTable sparkDestinationTable = sparkDestinationTableMapper.toEntity(sparkDestinationTableDTO);
        sparkDestinationTable = sparkDestinationTableRepository.save(sparkDestinationTable);
        SparkDestinationTableDTO result = sparkDestinationTableMapper.toDto(sparkDestinationTable);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, sparkDestinationTableDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /spark-destination-tables : get all the sparkDestinationTables.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of sparkDestinationTables in body
     */
    @GetMapping("/spark-destination-tables")
    @Timed
    public List<SparkDestinationTableDTO> getAllSparkDestinationTables() {
        log.debug("REST request to get all SparkDestinationTables");
        List<SparkDestinationTable> sparkDestinationTables = sparkDestinationTableRepository.findAll();
        return sparkDestinationTableMapper.toDto(sparkDestinationTables);
        }

    /**
     * GET  /spark-destination-tables/:id : get the "id" sparkDestinationTable.
     *
     * @param id the id of the sparkDestinationTableDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the sparkDestinationTableDTO, or with status 404 (Not Found)
     */
    @GetMapping("/spark-destination-tables/{id}")
    @Timed
    public ResponseEntity<SparkDestinationTableDTO> getSparkDestinationTable(@PathVariable Long id) {
        log.debug("REST request to get SparkDestinationTable : {}", id);
        SparkDestinationTable sparkDestinationTable = sparkDestinationTableRepository.findOne(id);
        SparkDestinationTableDTO sparkDestinationTableDTO = sparkDestinationTableMapper.toDto(sparkDestinationTable);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(sparkDestinationTableDTO));
    }

    /**
     * DELETE  /spark-destination-tables/:id : delete the "id" sparkDestinationTable.
     *
     * @param id the id of the sparkDestinationTableDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/spark-destination-tables/{id}")
    @Timed
    public ResponseEntity<Void> deleteSparkDestinationTable(@PathVariable Long id) {
        log.debug("REST request to delete SparkDestinationTable : {}", id);
        sparkDestinationTableRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
