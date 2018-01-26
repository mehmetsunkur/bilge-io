package io.bilge.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the SparkDataset entity.
 */
public class SparkDatasetDTO implements Serializable {

    private Long id;

    private String module;

    private String name;

    private String desc;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getModule() {
        return module;
    }

    public void setModule(String module) {
        this.module = module;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SparkDatasetDTO sparkDatasetDTO = (SparkDatasetDTO) o;
        if(sparkDatasetDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sparkDatasetDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SparkDatasetDTO{" +
            "id=" + getId() +
            ", module='" + getModule() + "'" +
            ", name='" + getName() + "'" +
            ", desc='" + getDesc() + "'" +
            "}";
    }
}
