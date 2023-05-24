package lostcost.lostcost.dto;

import lombok.Data;

@Data
public class RouteRequest {
    private double fromLat;
    private double fromLon;
    private double toLat;
    private double toLon;
}
