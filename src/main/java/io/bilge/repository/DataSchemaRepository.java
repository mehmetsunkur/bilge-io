package io.bilge.repository;

import io.bilge.domain.DataSchema;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the DataSchema entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DataSchemaRepository extends JpaRepository<DataSchema, Long> {

}
