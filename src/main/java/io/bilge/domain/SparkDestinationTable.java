package io.bilge.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A SparkDestinationTable.
 */
@Entity
@Table(name = "spark_destination_table")
public class SparkDestinationTable implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "jhi_desc")
    private String desc;

    @OneToMany(mappedBy = "parentTable")
    @JsonIgnore
    private Set<SparkDestinationColumn> columns = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public SparkDestinationTable name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDesc() {
        return desc;
    }

    public SparkDestinationTable desc(String desc) {
        this.desc = desc;
        return this;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public Set<SparkDestinationColumn> getColumns() {
        return columns;
    }

    public SparkDestinationTable columns(Set<SparkDestinationColumn> sparkDestinationColumns) {
        this.columns = sparkDestinationColumns;
        return this;
    }

    public SparkDestinationTable addColumns(SparkDestinationColumn sparkDestinationColumn) {
        this.columns.add(sparkDestinationColumn);
        sparkDestinationColumn.setParentTable(this);
        return this;
    }

    public SparkDestinationTable removeColumns(SparkDestinationColumn sparkDestinationColumn) {
        this.columns.remove(sparkDestinationColumn);
        sparkDestinationColumn.setParentTable(null);
        return this;
    }

    public void setColumns(Set<SparkDestinationColumn> sparkDestinationColumns) {
        this.columns = sparkDestinationColumns;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        SparkDestinationTable sparkDestinationTable = (SparkDestinationTable) o;
        if (sparkDestinationTable.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sparkDestinationTable.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SparkDestinationTable{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", desc='" + getDesc() + "'" +
            "}";
    }
}
