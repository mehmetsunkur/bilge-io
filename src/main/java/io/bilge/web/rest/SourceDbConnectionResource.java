package io.bilge.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.bilge.domain.SourceDbConnection;

import io.bilge.repository.SourceDbConnectionRepository;
import io.bilge.web.rest.errors.BadRequestAlertException;
import io.bilge.web.rest.util.HeaderUtil;
import io.bilge.service.dto.SourceDbConnectionDTO;
import io.bilge.service.mapper.SourceDbConnectionMapper;
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
 * REST controller for managing SourceDbConnection.
 */
@RestController
@RequestMapping("/api")
public class SourceDbConnectionResource {

    private final Logger log = LoggerFactory.getLogger(SourceDbConnectionResource.class);

    private static final String ENTITY_NAME = "sourceDbConnection";

    private final SourceDbConnectionRepository sourceDbConnectionRepository;

    private final SourceDbConnectionMapper sourceDbConnectionMapper;

    public SourceDbConnectionResource(SourceDbConnectionRepository sourceDbConnectionRepository, SourceDbConnectionMapper sourceDbConnectionMapper) {
        this.sourceDbConnectionRepository = sourceDbConnectionRepository;
        this.sourceDbConnectionMapper = sourceDbConnectionMapper;
    }

    /**
     * POST  /source-db-connections : Create a new sourceDbConnection.
     *
     * @param sourceDbConnectionDTO the sourceDbConnectionDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new sourceDbConnectionDTO, or with status 400 (Bad Request) if the sourceDbConnection has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/source-db-connections")
    @Timed
    public ResponseEntity<SourceDbConnectionDTO> createSourceDbConnection(@RequestBody SourceDbConnectionDTO sourceDbConnectionDTO) throws URISyntaxException {
        log.debug("REST request to save SourceDbConnection : {}", sourceDbConnectionDTO);
        if (sourceDbConnectionDTO.getId() != null) {
            throw new BadRequestAlertException("A new sourceDbConnection cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SourceDbConnection sourceDbConnection = sourceDbConnectionMapper.toEntity(sourceDbConnectionDTO);
        sourceDbConnection = sourceDbConnectionRepository.save(sourceDbConnection);
        SourceDbConnectionDTO result = sourceDbConnectionMapper.toDto(sourceDbConnection);
        return ResponseEntity.created(new URI("/api/source-db-connections/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /source-db-connections : Updates an existing sourceDbConnection.
     *
     * @param sourceDbConnectionDTO the sourceDbConnectionDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated sourceDbConnectionDTO,
     * or with status 400 (Bad Request) if the sourceDbConnectionDTO is not valid,
     * or with status 500 (Internal Server Error) if the sourceDbConnectionDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/source-db-connections")
    @Timed
    public ResponseEntity<SourceDbConnectionDTO> updateSourceDbConnection(@RequestBody SourceDbConnectionDTO sourceDbConnectionDTO) throws URISyntaxException {
        log.debug("REST request to update SourceDbConnection : {}", sourceDbConnectionDTO);
        if (sourceDbConnectionDTO.getId() == null) {
            return createSourceDbConnection(sourceDbConnectionDTO);
        }
        SourceDbConnection sourceDbConnection = sourceDbConnectionMapper.toEntity(sourceDbConnectionDTO);
        sourceDbConnection = sourceDbConnectionRepository.save(sourceDbConnection);
        SourceDbConnectionDTO result = sourceDbConnectionMapper.toDto(sourceDbConnection);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, sourceDbConnectionDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /source-db-connections : get all the sourceDbConnections.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of sourceDbConnections in body
     */
    @GetMapping("/source-db-connections")
    @Timed
    public List<SourceDbConnectionDTO> getAllSourceDbConnections() {
        log.debug("REST request to get all SourceDbConnections");
        List<SourceDbConnection> sourceDbConnections = sourceDbConnectionRepository.findAll();
        return sourceDbConnectionMapper.toDto(sourceDbConnections);
        }

    /**
     * GET  /source-db-connections/:id : get the "id" sourceDbConnection.
     *
     * @param id the id of the sourceDbConnectionDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the sourceDbConnectionDTO, or with status 404 (Not Found)
     */
    @GetMapping("/source-db-connections/{id}")
    @Timed
    public ResponseEntity<SourceDbConnectionDTO> getSourceDbConnection(@PathVariable Long id) {
        log.debug("REST request to get SourceDbConnection : {}", id);
        SourceDbConnection sourceDbConnection = sourceDbConnectionRepository.findOne(id);
        SourceDbConnectionDTO sourceDbConnectionDTO = sourceDbConnectionMapper.toDto(sourceDbConnection);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(sourceDbConnectionDTO));
    }

    /**
     * DELETE  /source-db-connections/:id : delete the "id" sourceDbConnection.
     *
     * @param id the id of the sourceDbConnectionDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/source-db-connections/{id}")
    @Timed
    public ResponseEntity<Void> deleteSourceDbConnection(@PathVariable Long id) {
        log.debug("REST request to delete SourceDbConnection : {}", id);
        sourceDbConnectionRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
