package io.bilge.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

import io.bilge.domain.enumeration.ColumnType;

/**
 * A SparkDatasetColumn.
 */
@Entity
@Table(name = "spark_dataset_column")
public class SparkDatasetColumn implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_type")
    private ColumnType type;

    @Column(name = "jhi_desc")
    private String desc;

    @ManyToOne
    private SparkDataset parentDataset;

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

    public SparkDatasetColumn name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ColumnType getType() {
        return type;
    }

    public SparkDatasetColumn type(ColumnType type) {
        this.type = type;
        return this;
    }

    public void setType(ColumnType type) {
        this.type = type;
    }

    public String getDesc() {
        return desc;
    }

    public SparkDatasetColumn desc(String desc) {
        this.desc = desc;
        return this;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public SparkDataset getParentDataset() {
        return parentDataset;
    }

    public SparkDatasetColumn parentDataset(SparkDataset sparkDataset) {
        this.parentDataset = sparkDataset;
        return this;
    }

    public void setParentDataset(SparkDataset sparkDataset) {
        this.parentDataset = sparkDataset;
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
        SparkDatasetColumn sparkDatasetColumn = (SparkDatasetColumn) o;
        if (sparkDatasetColumn.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sparkDatasetColumn.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SparkDatasetColumn{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", type='" + getType() + "'" +
            ", desc='" + getDesc() + "'" +
            "}";
    }
}
