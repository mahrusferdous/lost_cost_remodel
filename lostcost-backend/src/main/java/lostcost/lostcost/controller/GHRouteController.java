package lostcost.lostcost.controller;

import com.graphhopper.GHResponse;
import lostcost.lostcost.dto.RouteRequest;
import lostcost.lostcost.service.GHRoutingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/route")
public class GHRouteController {
    private final GHRoutingService routingService;

    public GHRouteController(GHRoutingService routingService) {
        this.routingService = routingService;
    }

    @PostMapping("/calculate")
    public CompletableFuture<ResponseEntity<GHResponse>> calculateRoute(@RequestBody RouteRequest request) {
        return routingService.calculateRoute(request.getFromLat(), request.getFromLon(), request.getToLat(), request.getToLon())
                .thenApply(ResponseEntity::ok)
                .exceptionally(e -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
    }

    @PostMapping("/polyline")
    public CompletableFuture<ResponseEntity<String>> getRoute(@RequestBody RouteRequest request) {
        return routingService.calculateRoute(request.getFromLat(), request.getFromLon(), request.getToLat(), request.getToLon())
                .thenCompose(route -> routingService.getPolyline(route))
                .thenApply(polyline -> {
                    if (polyline == null) {
                        return ResponseEntity.badRequest().body("Unable to calculate route");
                    } else {
                        return ResponseEntity.ok(polyline);
                    }
                })
                .exceptionally(e -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
    }

}
