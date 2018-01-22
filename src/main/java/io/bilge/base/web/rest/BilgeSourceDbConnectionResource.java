package io.bilge.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.bilge.base.exceptions.BilgeNotFoundException;
import io.bilge.base.exceptions.BilgeSchemaNotFoundException;
import io.bilge.base.exceptions.ErrorDetails;
import io.bilge.base.service.metamodel.BilgeJdbcDataContextFactoryService;
import io.bilge.repository.SourceDbConnectionRepository;
import io.bilge.service.dto.DataColumnDTO;
import io.bilge.service.dto.DataSchemaDTO;
import io.bilge.service.dto.DataTableDTO;
import io.bilge.service.dto.SourceDbConnectionDTO;
import io.bilge.service.mapper.SourceDbConnectionMapper;
import io.bilge.web.rest.SourceDbConnectionResource;
import io.bilge.web.rest.util.HeaderUtil;
import org.apache.commons.lang3.StringUtils;
import org.apache.metamodel.DataContext;
import org.apache.metamodel.schema.Schema;
import org.apache.metamodel.schema.Table;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by mehmet on 1/21/18.
 */
@RestController
@RequestMapping("/api/bilge")
public class BilgeSourceDbConnectionResource extends SourceDbConnectionResource {
    private final Logger log = LoggerFactory.getLogger(BilgeSourceDbConnectionResource.class);

    protected final BilgeJdbcDataContextFactoryService contextFactoryService;


    public BilgeSourceDbConnectionResource(SourceDbConnectionRepository sourceDbConnectionRepository, SourceDbConnectionMapper sourceDbConnectionMapper, BilgeJdbcDataContextFactoryService contextFactoryService) {
        super(sourceDbConnectionRepository, sourceDbConnectionMapper);
        this.contextFactoryService = contextFactoryService;
    }

    /**
     * GET  /source-db-connections/:id : get the "id" sourceDbConnection.
     *
     * @param id the id of the sourceDbConnectionDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the sourceDbConnectionDTO, or with status 404 (Not Found)
     */
    @GetMapping("/source-db-connections/{id}/schemas")
    @Timed
    public ResponseEntity<List<DataSchemaDTO>> listSchemas(@PathVariable Long id) {
        DataContext dataContext = getDataContextByConnectionId(id);
        List<String> schemaNames = dataContext.getSchemaNames();

        List<DataSchemaDTO> schemas = new ArrayList<>();
        for (String schema : schemaNames) {
            DataSchemaDTO dataSchemaDTO = new DataSchemaDTO();
            dataSchemaDTO.setName(schema);
            schemas.add(dataSchemaDTO);
        }
        return ResponseEntity.ok().body(schemas);
    }

    /**
     * GET  /source-db-connections/:id : get the "id" sourceDbConnection.
     *
     * @param id the id of the sourceDbConnectionDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the sourceDbConnectionDTO, or with status 404 (Not Found)
     */

    @GetMapping("/source-db-connections/{id}/schema/{schemaName}/tables")
    @Timed
    public List<DataTableDTO> getTables(@PathVariable Long id, @PathVariable String schemaName) {
        DataContext dataContext = getDataContextByConnectionId(id);
        List<String> schemaNames = dataContext.getSchemaNames();
        Schema schema = dataContext.getSchemaByName(schemaName);
        return schema.getTables().stream().map((table) -> {
            DataTableDTO dataTableDTO = new DataTableDTO();
            dataTableDTO.setName(table.getName());
            dataTableDTO.setColumnCount(new Long(table.getColumnCount()));
            return dataTableDTO;
        }).collect(Collectors.toList());
    }

    @GetMapping("/source-db-connections/{id}/schema/{schemaName}/table/{tableName}/columns")
    @Timed
    public List<DataColumnDTO> listColumns(@PathVariable Long id, @PathVariable String schemaName, @PathVariable String tableName) throws BilgeNotFoundException {
        DataContext dataContext = getDataContextByConnectionId(id);
        List<String> schemaNames = dataContext.getSchemaNames();
        List<DataColumnDTO> columnDTOS = new ArrayList<>();
        Schema schema = dataContext.getSchemaByName(schemaName);
        if (schema == null) {
            throw new BilgeSchemaNotFoundException(schemaName);
        }
        List<Table> tables = schema.getTables();
        Table givenTable = null;
        for (Table table : tables) {
            if (StringUtils.equalsAnyIgnoreCase(table.getName(), tableName)) {
                givenTable = table;
            }
        }
        if (givenTable == null) {
            throw new BilgeNotFoundException(tableName + " in " + schemaName);
        }


        columnDTOS = givenTable.getColumns().stream().map((column) -> {
            DataColumnDTO dataColumnDTO = new DataColumnDTO();
            dataColumnDTO.setName(column.getName());
            dataColumnDTO.setIndexed(column.isIndexed());
            dataColumnDTO.setNativeType(column.getNativeType());
            dataColumnDTO.setNullable(column.isNullable());
            dataColumnDTO.setPrimaryKey(column.isPrimaryKey());
            dataColumnDTO.setSize(new Long(column.getColumnSize()));
            dataColumnDTO.setRemarks(column.getRemarks());
            dataColumnDTO.setTableName(column.getTable().getName());
            return dataColumnDTO;
        }).collect(Collectors.toList());
        return columnDTOS;
    }

    private DataContext getDataContextByConnectionId(@PathVariable Long id) {
        ResponseEntity<SourceDbConnectionDTO> sourceDbConnection = super.getSourceDbConnection(id);
        sourceDbConnection.getBody().getUrl();
        return this.contextFactoryService.create(sourceDbConnection.getBody());

    }

/*    @ExceptionHandler(Exception.class)
    public final ResponseEntity<ErrorDetails> handleException(Exception ex, WebRequest request) {
        log.error(ex.getMessage(),ex);
        ErrorDetails errorDetails = new ErrorDetails(new Date(), ex.getMessage(),
            request.getDescription(false));
        return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
    }*/
}
