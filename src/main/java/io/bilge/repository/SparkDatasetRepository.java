package io.bilge.repository;

import io.bilge.domain.SparkDataset;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the SparkDataset entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SparkDatasetRepository extends JpaRepository<SparkDataset, Long> {

}
