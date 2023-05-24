package lostcost.lostcost.controller;

import com.graphhopper.GHResponse;
import lostcost.lostcost.dto.RouteRequest;
import lostcost.lostcost.service.GHRoutingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/route")
public class GHRouteController {
    private final GHRoutingService routingService;

    public GHRouteController(GHRoutingService routingService) {
        this.routingService = routingService;
    }

    @PostMapping
    public ResponseEntity<GHResponse> calculateRoute(@RequestBody RouteRequest request) {
        GHResponse response = routingService.calculateRoute(
                request.getFromLat(), request.getFromLon(),
                request.getToLat(), request.getToLon());
        return ResponseEntity.ok(response);
    }
}
