package lostcost.lostcost.controller;

import com.graphhopper.GHResponse;
import lostcost.lostcost.dto.RouteRequest;
import lostcost.lostcost.service.GHRoutingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/route")
@CrossOrigin(origins = "*")
public class GHRouteController {
    private final GHRoutingService routingService;

    public GHRouteController(GHRoutingService routingService) {
        this.routingService = routingService;
    }

    @PostMapping("/calculate")
    public ResponseEntity<GHResponse> calculateRoute(@RequestBody RouteRequest request) {
        try {
            GHResponse response = routingService.calculateRoute(request.getFromLat(), request.getFromLon(), request.getToLat(), request.getToLon()).join();
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/polyline")
    public ResponseEntity<String> getRoute(@RequestBody RouteRequest request) {
        try {
            String polyline = routingService.calculateRoute(request.getFromLat(), request.getFromLon(), request.getToLat(), request.getToLon())
                    .thenCompose(route -> routingService.getPolyline(route)).join();

            if (polyline == null) {
                return ResponseEntity.badRequest().body("Unable to calculate route");
            } else {
                return ResponseEntity.ok(polyline);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
