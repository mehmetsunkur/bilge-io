package io.bilge.service.mapper;

import io.bilge.domain.*;
import io.bilge.service.dto.SourceDbConnectionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity SourceDbConnection and its DTO SourceDbConnectionDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface SourceDbConnectionMapper extends EntityMapper<SourceDbConnectionDTO, SourceDbConnection> {


    @Mapping(target = "dataContexts", ignore = true)
    SourceDbConnection toEntity(SourceDbConnectionDTO sourceDbConnectionDTO);

    default SourceDbConnection fromId(Long id) {
        if (id == null) {
            return null;
        }
        SourceDbConnection sourceDbConnection = new SourceDbConnection();
        sourceDbConnection.setId(id);
        return sourceDbConnection;
    }
}
