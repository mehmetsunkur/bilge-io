package io.bilge.repository;

import io.bilge.domain.SparkDatasetColumn;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the SparkDatasetColumn entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SparkDatasetColumnRepository extends JpaRepository<SparkDatasetColumn, Long> {

}
