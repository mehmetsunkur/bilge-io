package io.bilge.service.mapper;

import io.bilge.domain.*;
import io.bilge.service.dto.DataTableDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity DataTable and its DTO DataTableDTO.
 */
@Mapper(componentModel = "spring", uses = {DataSchemaMapper.class})
public interface DataTableMapper extends EntityMapper<DataTableDTO, DataTable> {

    @Mapping(source = "schema.id", target = "schemaId")
    @Mapping(source = "schema.name", target = "schemaName")
    DataTableDTO toDto(DataTable dataTable);

    @Mapping(target = "columns", ignore = true)
    @Mapping(source = "schemaId", target = "schema")
    DataTable toEntity(DataTableDTO dataTableDTO);

    default DataTable fromId(Long id) {
        if (id == null) {
            return null;
        }
        DataTable dataTable = new DataTable();
        dataTable.setId(id);
        return dataTable;
    }
}
