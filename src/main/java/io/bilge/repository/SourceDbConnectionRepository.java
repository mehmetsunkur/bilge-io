package io.bilge.repository;

import io.bilge.domain.SourceDbConnection;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the SourceDbConnection entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SourceDbConnectionRepository extends JpaRepository<SourceDbConnection, Long> {

}
