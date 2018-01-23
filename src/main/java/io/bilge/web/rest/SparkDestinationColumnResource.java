package io.bilge.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.bilge.domain.SparkDestinationColumn;

import io.bilge.repository.SparkDestinationColumnRepository;
import io.bilge.web.rest.errors.BadRequestAlertException;
import io.bilge.web.rest.util.HeaderUtil;
import io.bilge.service.dto.SparkDestinationColumnDTO;
import io.bilge.service.mapper.SparkDestinationColumnMapper;
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
 * REST controller for managing SparkDestinationColumn.
 */
@RestController
@RequestMapping("/api")
public class SparkDestinationColumnResource {

    private final Logger log = LoggerFactory.getLogger(SparkDestinationColumnResource.class);

    private static final String ENTITY_NAME = "sparkDestinationColumn";

    private final SparkDestinationColumnRepository sparkDestinationColumnRepository;

    private final SparkDestinationColumnMapper sparkDestinationColumnMapper;

    public SparkDestinationColumnResource(SparkDestinationColumnRepository sparkDestinationColumnRepository, SparkDestinationColumnMapper sparkDestinationColumnMapper) {
        this.sparkDestinationColumnRepository = sparkDestinationColumnRepository;
        this.sparkDestinationColumnMapper = sparkDestinationColumnMapper;
    }

    /**
     * POST  /spark-destination-columns : Create a new sparkDestinationColumn.
     *
     * @param sparkDestinationColumnDTO the sparkDestinationColumnDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new sparkDestinationColumnDTO, or with status 400 (Bad Request) if the sparkDestinationColumn has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/spark-destination-columns")
    @Timed
    public ResponseEntity<SparkDestinationColumnDTO> createSparkDestinationColumn(@RequestBody SparkDestinationColumnDTO sparkDestinationColumnDTO) throws URISyntaxException {
        log.debug("REST request to save SparkDestinationColumn : {}", sparkDestinationColumnDTO);
        if (sparkDestinationColumnDTO.getId() != null) {
            throw new BadRequestAlertException("A new sparkDestinationColumn cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SparkDestinationColumn sparkDestinationColumn = sparkDestinationColumnMapper.toEntity(sparkDestinationColumnDTO);
        sparkDestinationColumn = sparkDestinationColumnRepository.save(sparkDestinationColumn);
        SparkDestinationColumnDTO result = sparkDestinationColumnMapper.toDto(sparkDestinationColumn);
        return ResponseEntity.created(new URI("/api/spark-destination-columns/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /spark-destination-columns : Updates an existing sparkDestinationColumn.
     *
     * @param sparkDestinationColumnDTO the sparkDestinationColumnDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated sparkDestinationColumnDTO,
     * or with status 400 (Bad Request) if the sparkDestinationColumnDTO is not valid,
     * or with status 500 (Internal Server Error) if the sparkDestinationColumnDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/spark-destination-columns")
    @Timed
    public ResponseEntity<SparkDestinationColumnDTO> updateSparkDestinationColumn(@RequestBody SparkDestinationColumnDTO sparkDestinationColumnDTO) throws URISyntaxException {
        log.debug("REST request to update SparkDestinationColumn : {}", sparkDestinationColumnDTO);
        if (sparkDestinationColumnDTO.getId() == null) {
            return createSparkDestinationColumn(sparkDestinationColumnDTO);
        }
        SparkDestinationColumn sparkDestinationColumn = sparkDestinationColumnMapper.toEntity(sparkDestinationColumnDTO);
        sparkDestinationColumn = sparkDestinationColumnRepository.save(sparkDestinationColumn);
        SparkDestinationColumnDTO result = sparkDestinationColumnMapper.toDto(sparkDestinationColumn);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, sparkDestinationColumnDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /spark-destination-columns : get all the sparkDestinationColumns.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of sparkDestinationColumns in body
     */
    @GetMapping("/spark-destination-columns")
    @Timed
    public List<SparkDestinationColumnDTO> getAllSparkDestinationColumns() {
        log.debug("REST request to get all SparkDestinationColumns");
        List<SparkDestinationColumn> sparkDestinationColumns = sparkDestinationColumnRepository.findAll();
        return sparkDestinationColumnMapper.toDto(sparkDestinationColumns);
        }

    /**
     * GET  /spark-destination-columns/:id : get the "id" sparkDestinationColumn.
     *
     * @param id the id of the sparkDestinationColumnDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the sparkDestinationColumnDTO, or with status 404 (Not Found)
     */
    @GetMapping("/spark-destination-columns/{id}")
    @Timed
    public ResponseEntity<SparkDestinationColumnDTO> getSparkDestinationColumn(@PathVariable Long id) {
        log.debug("REST request to get SparkDestinationColumn : {}", id);
        SparkDestinationColumn sparkDestinationColumn = sparkDestinationColumnRepository.findOne(id);
        SparkDestinationColumnDTO sparkDestinationColumnDTO = sparkDestinationColumnMapper.toDto(sparkDestinationColumn);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(sparkDestinationColumnDTO));
    }

    /**
     * DELETE  /spark-destination-columns/:id : delete the "id" sparkDestinationColumn.
     *
     * @param id the id of the sparkDestinationColumnDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/spark-destination-columns/{id}")
    @Timed
    public ResponseEntity<Void> deleteSparkDestinationColumn(@PathVariable Long id) {
        log.debug("REST request to delete SparkDestinationColumn : {}", id);
        sparkDestinationColumnRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
