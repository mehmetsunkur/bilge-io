package io.bilge.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.bilge.domain.DataContext;

import io.bilge.repository.DataContextRepository;
import io.bilge.web.rest.errors.BadRequestAlertException;
import io.bilge.web.rest.util.HeaderUtil;
import io.bilge.service.dto.DataContextDTO;
import io.bilge.service.mapper.DataContextMapper;
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
 * REST controller for managing DataContext.
 */
@RestController
@RequestMapping("/api")
public class DataContextResource {

    private final Logger log = LoggerFactory.getLogger(DataContextResource.class);

    private static final String ENTITY_NAME = "dataContext";

    private final DataContextRepository dataContextRepository;

    private final DataContextMapper dataContextMapper;

    public DataContextResource(DataContextRepository dataContextRepository, DataContextMapper dataContextMapper) {
        this.dataContextRepository = dataContextRepository;
        this.dataContextMapper = dataContextMapper;
    }

    /**
     * POST  /data-contexts : Create a new dataContext.
     *
     * @param dataContextDTO the dataContextDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new dataContextDTO, or with status 400 (Bad Request) if the dataContext has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/data-contexts")
    @Timed
    public ResponseEntity<DataContextDTO> createDataContext(@RequestBody DataContextDTO dataContextDTO) throws URISyntaxException {
        log.debug("REST request to save DataContext : {}", dataContextDTO);
        if (dataContextDTO.getId() != null) {
            throw new BadRequestAlertException("A new dataContext cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DataContext dataContext = dataContextMapper.toEntity(dataContextDTO);
        dataContext = dataContextRepository.save(dataContext);
        DataContextDTO result = dataContextMapper.toDto(dataContext);
        return ResponseEntity.created(new URI("/api/data-contexts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /data-contexts : Updates an existing dataContext.
     *
     * @param dataContextDTO the dataContextDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated dataContextDTO,
     * or with status 400 (Bad Request) if the dataContextDTO is not valid,
     * or with status 500 (Internal Server Error) if the dataContextDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/data-contexts")
    @Timed
    public ResponseEntity<DataContextDTO> updateDataContext(@RequestBody DataContextDTO dataContextDTO) throws URISyntaxException {
        log.debug("REST request to update DataContext : {}", dataContextDTO);
        if (dataContextDTO.getId() == null) {
            return createDataContext(dataContextDTO);
        }
        DataContext dataContext = dataContextMapper.toEntity(dataContextDTO);
        dataContext = dataContextRepository.save(dataContext);
        DataContextDTO result = dataContextMapper.toDto(dataContext);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, dataContextDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /data-contexts : get all the dataContexts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of dataContexts in body
     */
    @GetMapping("/data-contexts")
    @Timed
    public List<DataContextDTO> getAllDataContexts() {
        log.debug("REST request to get all DataContexts");
        List<DataContext> dataContexts = dataContextRepository.findAll();
        return dataContextMapper.toDto(dataContexts);
        }

    /**
     * GET  /data-contexts/:id : get the "id" dataContext.
     *
     * @param id the id of the dataContextDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the dataContextDTO, or with status 404 (Not Found)
     */
    @GetMapping("/data-contexts/{id}")
    @Timed
    public ResponseEntity<DataContextDTO> getDataContext(@PathVariable Long id) {
        log.debug("REST request to get DataContext : {}", id);
        DataContext dataContext = dataContextRepository.findOne(id);
        DataContextDTO dataContextDTO = dataContextMapper.toDto(dataContext);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(dataContextDTO));
    }

    /**
     * DELETE  /data-contexts/:id : delete the "id" dataContext.
     *
     * @param id the id of the dataContextDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/data-contexts/{id}")
    @Timed
    public ResponseEntity<Void> deleteDataContext(@PathVariable Long id) {
        log.debug("REST request to delete DataContext : {}", id);
        dataContextRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
