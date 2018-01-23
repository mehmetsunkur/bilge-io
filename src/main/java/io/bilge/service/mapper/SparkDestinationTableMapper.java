package io.bilge.service.mapper;

import io.bilge.domain.*;
import io.bilge.service.dto.SparkDestinationTableDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity SparkDestinationTable and its DTO SparkDestinationTableDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface SparkDestinationTableMapper extends EntityMapper<SparkDestinationTableDTO, SparkDestinationTable> {


    @Mapping(target = "columns", ignore = true)
    SparkDestinationTable toEntity(SparkDestinationTableDTO sparkDestinationTableDTO);

    default SparkDestinationTable fromId(Long id) {
        if (id == null) {
            return null;
        }
        SparkDestinationTable sparkDestinationTable = new SparkDestinationTable();
        sparkDestinationTable.setId(id);
        return sparkDestinationTable;
    }
}
