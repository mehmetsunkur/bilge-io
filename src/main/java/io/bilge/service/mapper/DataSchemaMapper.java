package io.bilge.service.mapper;

import io.bilge.domain.*;
import io.bilge.service.dto.DataSchemaDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity DataSchema and its DTO DataSchemaDTO.
 */
@Mapper(componentModel = "spring", uses = {DataContextMapper.class})
public interface DataSchemaMapper extends EntityMapper<DataSchemaDTO, DataSchema> {

    @Mapping(source = "dataContext.id", target = "dataContextId")
    @Mapping(source = "dataContext.name", target = "dataContextName")
    DataSchemaDTO toDto(DataSchema dataSchema);

    @Mapping(target = "tables", ignore = true)
    @Mapping(source = "dataContextId", target = "dataContext")
    DataSchema toEntity(DataSchemaDTO dataSchemaDTO);

    default DataSchema fromId(Long id) {
        if (id == null) {
            return null;
        }
        DataSchema dataSchema = new DataSchema();
        dataSchema.setId(id);
        return dataSchema;
    }
}
