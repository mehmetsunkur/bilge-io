package io.bilge.service.mapper;

import io.bilge.domain.*;
import io.bilge.service.dto.SparkDatasetColumnDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity SparkDatasetColumn and its DTO SparkDatasetColumnDTO.
 */
@Mapper(componentModel = "spring", uses = {SparkDatasetMapper.class})
public interface SparkDatasetColumnMapper extends EntityMapper<SparkDatasetColumnDTO, SparkDatasetColumn> {

    @Mapping(source = "parentDataset.id", target = "parentDatasetId")
    @Mapping(source = "parentDataset.name", target = "parentDatasetName")
    SparkDatasetColumnDTO toDto(SparkDatasetColumn sparkDatasetColumn);

    @Mapping(source = "parentDatasetId", target = "parentDataset")
    SparkDatasetColumn toEntity(SparkDatasetColumnDTO sparkDatasetColumnDTO);

    default SparkDatasetColumn fromId(Long id) {
        if (id == null) {
            return null;
        }
        SparkDatasetColumn sparkDatasetColumn = new SparkDatasetColumn();
        sparkDatasetColumn.setId(id);
        return sparkDatasetColumn;
    }
}
