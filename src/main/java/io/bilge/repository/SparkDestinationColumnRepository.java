package io.bilge.repository;

import io.bilge.domain.SparkDestinationColumn;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the SparkDestinationColumn entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SparkDestinationColumnRepository extends JpaRepository<SparkDestinationColumn, Long> {

}
