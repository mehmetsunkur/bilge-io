package io.bilge.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.bilge.domain.SparkDataset;

import io.bilge.repository.SparkDatasetRepository;
import io.bilge.web.rest.errors.BadRequestAlertException;
import io.bilge.web.rest.util.HeaderUtil;
import io.bilge.service.dto.SparkDatasetDTO;
import io.bilge.service.mapper.SparkDatasetMapper;
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
 * REST controller for managing SparkDataset.
 */
@RestController
@RequestMapping("/api")
public class SparkDatasetResource {

    private final Logger log = LoggerFactory.getLogger(SparkDatasetResource.class);

    private static final String ENTITY_NAME = "sparkDataset";

    private final SparkDatasetRepository sparkDatasetRepository;

    private final SparkDatasetMapper sparkDatasetMapper;

    public SparkDatasetResource(SparkDatasetRepository sparkDatasetRepository, SparkDatasetMapper sparkDatasetMapper) {
        this.sparkDatasetRepository = sparkDatasetRepository;
        this.sparkDatasetMapper = sparkDatasetMapper;
    }

    /**
     * POST  /spark-datasets : Create a new sparkDataset.
     *
     * @param sparkDatasetDTO the sparkDatasetDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new sparkDatasetDTO, or with status 400 (Bad Request) if the sparkDataset has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/spark-datasets")
    @Timed
    public ResponseEntity<SparkDatasetDTO> createSparkDataset(@RequestBody SparkDatasetDTO sparkDatasetDTO) throws URISyntaxException {
        log.debug("REST request to save SparkDataset : {}", sparkDatasetDTO);
        if (sparkDatasetDTO.getId() != null) {
            throw new BadRequestAlertException("A new sparkDataset cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SparkDataset sparkDataset = sparkDatasetMapper.toEntity(sparkDatasetDTO);
        sparkDataset = sparkDatasetRepository.save(sparkDataset);
        SparkDatasetDTO result = sparkDatasetMapper.toDto(sparkDataset);
        return ResponseEntity.created(new URI("/api/spark-datasets/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /spark-datasets : Updates an existing sparkDataset.
     *
     * @param sparkDatasetDTO the sparkDatasetDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated sparkDatasetDTO,
     * or with status 400 (Bad Request) if the sparkDatasetDTO is not valid,
     * or with status 500 (Internal Server Error) if the sparkDatasetDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/spark-datasets")
    @Timed
    public ResponseEntity<SparkDatasetDTO> updateSparkDataset(@RequestBody SparkDatasetDTO sparkDatasetDTO) throws URISyntaxException {
        log.debug("REST request to update SparkDataset : {}", sparkDatasetDTO);
        if (sparkDatasetDTO.getId() == null) {
            return createSparkDataset(sparkDatasetDTO);
        }
        SparkDataset sparkDataset = sparkDatasetMapper.toEntity(sparkDatasetDTO);
        sparkDataset = sparkDatasetRepository.save(sparkDataset);
        SparkDatasetDTO result = sparkDatasetMapper.toDto(sparkDataset);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, sparkDatasetDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /spark-datasets : get all the sparkDatasets.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of sparkDatasets in body
     */
    @GetMapping("/spark-datasets")
    @Timed
    public List<SparkDatasetDTO> getAllSparkDatasets() {
        log.debug("REST request to get all SparkDatasets");
        List<SparkDataset> sparkDatasets = sparkDatasetRepository.findAll();
        return sparkDatasetMapper.toDto(sparkDatasets);
        }

    /**
     * GET  /spark-datasets/:id : get the "id" sparkDataset.
     *
     * @param id the id of the sparkDatasetDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the sparkDatasetDTO, or with status 404 (Not Found)
     */
    @GetMapping("/spark-datasets/{id}")
    @Timed
    public ResponseEntity<SparkDatasetDTO> getSparkDataset(@PathVariable Long id) {
        log.debug("REST request to get SparkDataset : {}", id);
        SparkDataset sparkDataset = sparkDatasetRepository.findOne(id);
        SparkDatasetDTO sparkDatasetDTO = sparkDatasetMapper.toDto(sparkDataset);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(sparkDatasetDTO));
    }

    /**
     * DELETE  /spark-datasets/:id : delete the "id" sparkDataset.
     *
     * @param id the id of the sparkDatasetDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/spark-datasets/{id}")
    @Timed
    public ResponseEntity<Void> deleteSparkDataset(@PathVariable Long id) {
        log.debug("REST request to delete SparkDataset : {}", id);
        sparkDatasetRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
