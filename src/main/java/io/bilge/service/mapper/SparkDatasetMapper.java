package io.bilge.service.mapper;

import io.bilge.domain.*;
import io.bilge.service.dto.SparkDatasetDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity SparkDataset and its DTO SparkDatasetDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface SparkDatasetMapper extends EntityMapper<SparkDatasetDTO, SparkDataset> {


    @Mapping(target = "columns", ignore = true)
    SparkDataset toEntity(SparkDatasetDTO sparkDatasetDTO);

    default SparkDataset fromId(Long id) {
        if (id == null) {
            return null;
        }
        SparkDataset sparkDataset = new SparkDataset();
        sparkDataset.setId(id);
        return sparkDataset;
    }
}
