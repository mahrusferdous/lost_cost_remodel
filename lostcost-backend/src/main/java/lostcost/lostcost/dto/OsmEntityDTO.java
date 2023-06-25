package lostcost.lostcost.dto;

import lombok.Data;
import org.geolatte.geom.crs.PrimeMeridian;

@Data
public class OsmEntityDTO {
    private String name;
    private Double latitude;
    private Double longitude;
}
