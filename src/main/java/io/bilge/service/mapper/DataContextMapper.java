package io.bilge.service.mapper;

import io.bilge.domain.*;
import io.bilge.service.dto.DataContextDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity DataContext and its DTO DataContextDTO.
 */
@Mapper(componentModel = "spring", uses = {SourceDbConnectionMapper.class})
public interface DataContextMapper extends EntityMapper<DataContextDTO, DataContext> {

    @Mapping(source = "sourceConnection.id", target = "sourceConnectionId")
    @Mapping(source = "sourceConnection.name", target = "sourceConnectionName")
    DataContextDTO toDto(DataContext dataContext);

    @Mapping(target = "schemas", ignore = true)
    @Mapping(source = "sourceConnectionId", target = "sourceConnection")
    DataContext toEntity(DataContextDTO dataContextDTO);

    default DataContext fromId(Long id) {
        if (id == null) {
            return null;
        }
        DataContext dataContext = new DataContext();
        dataContext.setId(id);
        return dataContext;
    }
}
