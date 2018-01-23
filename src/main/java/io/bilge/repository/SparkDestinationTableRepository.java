package io.bilge.repository;

import io.bilge.domain.SparkDestinationTable;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the SparkDestinationTable entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SparkDestinationTableRepository extends JpaRepository<SparkDestinationTable, Long> {

}
