package io.bilge.service.mapper;

import io.bilge.domain.*;
import io.bilge.service.dto.DataColumnDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity DataColumn and its DTO DataColumnDTO.
 */
@Mapper(componentModel = "spring", uses = {DataTableMapper.class})
public interface DataColumnMapper extends EntityMapper<DataColumnDTO, DataColumn> {

    @Mapping(source = "table.id", target = "tableId")
    @Mapping(source = "table.name", target = "tableName")
    DataColumnDTO toDto(DataColumn dataColumn);

    @Mapping(source = "tableId", target = "table")
    DataColumn toEntity(DataColumnDTO dataColumnDTO);

    default DataColumn fromId(Long id) {
        if (id == null) {
            return null;
        }
        DataColumn dataColumn = new DataColumn();
        dataColumn.setId(id);
        return dataColumn;
    }
}
