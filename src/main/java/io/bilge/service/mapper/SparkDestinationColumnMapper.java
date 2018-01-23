package io.bilge.service.mapper;

import io.bilge.domain.*;
import io.bilge.service.dto.SparkDestinationColumnDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity SparkDestinationColumn and its DTO SparkDestinationColumnDTO.
 */
@Mapper(componentModel = "spring", uses = {SparkDestinationTableMapper.class})
public interface SparkDestinationColumnMapper extends EntityMapper<SparkDestinationColumnDTO, SparkDestinationColumn> {

    @Mapping(source = "parentTable.id", target = "parentTableId")
    @Mapping(source = "parentTable.name", target = "parentTableName")
    SparkDestinationColumnDTO toDto(SparkDestinationColumn sparkDestinationColumn);

    @Mapping(source = "parentTableId", target = "parentTable")
    SparkDestinationColumn toEntity(SparkDestinationColumnDTO sparkDestinationColumnDTO);

    default SparkDestinationColumn fromId(Long id) {
        if (id == null) {
            return null;
        }
        SparkDestinationColumn sparkDestinationColumn = new SparkDestinationColumn();
        sparkDestinationColumn.setId(id);
        return sparkDestinationColumn;
    }
}
