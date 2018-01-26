package io.bilge.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import io.bilge.domain.enumeration.ColumnType;

/**
 * A DTO for the SparkDatasetColumn entity.
 */
public class SparkDatasetColumnDTO implements Serializable {

    private Long id;

    private String name;

    private ColumnType type;

    private String desc;

    private Long parentDatasetId;

    private String parentDatasetName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ColumnType getType() {
        return type;
    }

    public void setType(ColumnType type) {
        this.type = type;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public Long getParentDatasetId() {
        return parentDatasetId;
    }

    public void setParentDatasetId(Long sparkDatasetId) {
        this.parentDatasetId = sparkDatasetId;
    }

    public String getParentDatasetName() {
        return parentDatasetName;
    }

    public void setParentDatasetName(String sparkDatasetName) {
        this.parentDatasetName = sparkDatasetName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SparkDatasetColumnDTO sparkDatasetColumnDTO = (SparkDatasetColumnDTO) o;
        if(sparkDatasetColumnDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sparkDatasetColumnDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SparkDatasetColumnDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", type='" + getType() + "'" +
            ", desc='" + getDesc() + "'" +
            "}";
    }
}
