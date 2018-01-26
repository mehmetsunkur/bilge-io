package io.bilge.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A SparkDataset.
 */
@Entity
@Table(name = "spark_dataset")
public class SparkDataset implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "module")
    private String module;

    @Column(name = "name")
    private String name;

    @Column(name = "jhi_desc")
    private String desc;

    @OneToMany(mappedBy = "parentDataset")
    @JsonIgnore
    private Set<SparkDatasetColumn> columns = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getModule() {
        return module;
    }

    public SparkDataset module(String module) {
        this.module = module;
        return this;
    }

    public void setModule(String module) {
        this.module = module;
    }

    public String getName() {
        return name;
    }

    public SparkDataset name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDesc() {
        return desc;
    }

    public SparkDataset desc(String desc) {
        this.desc = desc;
        return this;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public Set<SparkDatasetColumn> getColumns() {
        return columns;
    }

    public SparkDataset columns(Set<SparkDatasetColumn> sparkDatasetColumns) {
        this.columns = sparkDatasetColumns;
        return this;
    }

    public SparkDataset addColumns(SparkDatasetColumn sparkDatasetColumn) {
        this.columns.add(sparkDatasetColumn);
        sparkDatasetColumn.setParentDataset(this);
        return this;
    }

    public SparkDataset removeColumns(SparkDatasetColumn sparkDatasetColumn) {
        this.columns.remove(sparkDatasetColumn);
        sparkDatasetColumn.setParentDataset(null);
        return this;
    }

    public void setColumns(Set<SparkDatasetColumn> sparkDatasetColumns) {
        this.columns = sparkDatasetColumns;
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
        SparkDataset sparkDataset = (SparkDataset) o;
        if (sparkDataset.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sparkDataset.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SparkDataset{" +
            "id=" + getId() +
            ", module='" + getModule() + "'" +
            ", name='" + getName() + "'" +
            ", desc='" + getDesc() + "'" +
            "}";
    }
}
