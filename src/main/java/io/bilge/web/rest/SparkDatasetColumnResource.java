package io.bilge.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.bilge.domain.SparkDatasetColumn;

import io.bilge.repository.SparkDatasetColumnRepository;
import io.bilge.web.rest.errors.BadRequestAlertException;
import io.bilge.web.rest.util.HeaderUtil;
import io.bilge.service.dto.SparkDatasetColumnDTO;
import io.bilge.service.mapper.SparkDatasetColumnMapper;
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
 * REST controller for managing SparkDatasetColumn.
 */
@RestController
@RequestMapping("/api")
public class SparkDatasetColumnResource {

    private final Logger log = LoggerFactory.getLogger(SparkDatasetColumnResource.class);

    private static final String ENTITY_NAME = "sparkDatasetColumn";

    private final SparkDatasetColumnRepository sparkDatasetColumnRepository;

    private final SparkDatasetColumnMapper sparkDatasetColumnMapper;

    public SparkDatasetColumnResource(SparkDatasetColumnRepository sparkDatasetColumnRepository, SparkDatasetColumnMapper sparkDatasetColumnMapper) {
        this.sparkDatasetColumnRepository = sparkDatasetColumnRepository;
        this.sparkDatasetColumnMapper = sparkDatasetColumnMapper;
    }

    /**
     * POST  /spark-dataset-columns : Create a new sparkDatasetColumn.
     *
     * @param sparkDatasetColumnDTO the sparkDatasetColumnDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new sparkDatasetColumnDTO, or with status 400 (Bad Request) if the sparkDatasetColumn has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/spark-dataset-columns")
    @Timed
    public ResponseEntity<SparkDatasetColumnDTO> createSparkDatasetColumn(@RequestBody SparkDatasetColumnDTO sparkDatasetColumnDTO) throws URISyntaxException {
        log.debug("REST request to save SparkDatasetColumn : {}", sparkDatasetColumnDTO);
        if (sparkDatasetColumnDTO.getId() != null) {
            throw new BadRequestAlertException("A new sparkDatasetColumn cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SparkDatasetColumn sparkDatasetColumn = sparkDatasetColumnMapper.toEntity(sparkDatasetColumnDTO);
        sparkDatasetColumn = sparkDatasetColumnRepository.save(sparkDatasetColumn);
        SparkDatasetColumnDTO result = sparkDatasetColumnMapper.toDto(sparkDatasetColumn);
        return ResponseEntity.created(new URI("/api/spark-dataset-columns/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /spark-dataset-columns : Updates an existing sparkDatasetColumn.
     *
     * @param sparkDatasetColumnDTO the sparkDatasetColumnDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated sparkDatasetColumnDTO,
     * or with status 400 (Bad Request) if the sparkDatasetColumnDTO is not valid,
     * or with status 500 (Internal Server Error) if the sparkDatasetColumnDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/spark-dataset-columns")
    @Timed
    public ResponseEntity<SparkDatasetColumnDTO> updateSparkDatasetColumn(@RequestBody SparkDatasetColumnDTO sparkDatasetColumnDTO) throws URISyntaxException {
        log.debug("REST request to update SparkDatasetColumn : {}", sparkDatasetColumnDTO);
        if (sparkDatasetColumnDTO.getId() == null) {
            return createSparkDatasetColumn(sparkDatasetColumnDTO);
        }
        SparkDatasetColumn sparkDatasetColumn = sparkDatasetColumnMapper.toEntity(sparkDatasetColumnDTO);
        sparkDatasetColumn = sparkDatasetColumnRepository.save(sparkDatasetColumn);
        SparkDatasetColumnDTO result = sparkDatasetColumnMapper.toDto(sparkDatasetColumn);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, sparkDatasetColumnDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /spark-dataset-columns : get all the sparkDatasetColumns.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of sparkDatasetColumns in body
     */
    @GetMapping("/spark-dataset-columns")
    @Timed
    public List<SparkDatasetColumnDTO> getAllSparkDatasetColumns() {
        log.debug("REST request to get all SparkDatasetColumns");
        List<SparkDatasetColumn> sparkDatasetColumns = sparkDatasetColumnRepository.findAll();
        return sparkDatasetColumnMapper.toDto(sparkDatasetColumns);
        }

    /**
     * GET  /spark-dataset-columns/:id : get the "id" sparkDatasetColumn.
     *
     * @param id the id of the sparkDatasetColumnDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the sparkDatasetColumnDTO, or with status 404 (Not Found)
     */
    @GetMapping("/spark-dataset-columns/{id}")
    @Timed
    public ResponseEntity<SparkDatasetColumnDTO> getSparkDatasetColumn(@PathVariable Long id) {
        log.debug("REST request to get SparkDatasetColumn : {}", id);
        SparkDatasetColumn sparkDatasetColumn = sparkDatasetColumnRepository.findOne(id);
        SparkDatasetColumnDTO sparkDatasetColumnDTO = sparkDatasetColumnMapper.toDto(sparkDatasetColumn);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(sparkDatasetColumnDTO));
    }

    /**
     * DELETE  /spark-dataset-columns/:id : delete the "id" sparkDatasetColumn.
     *
     * @param id the id of the sparkDatasetColumnDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/spark-dataset-columns/{id}")
    @Timed
    public ResponseEntity<Void> deleteSparkDatasetColumn(@PathVariable Long id) {
        log.debug("REST request to delete SparkDatasetColumn : {}", id);
        sparkDatasetColumnRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
