package lostcost.lostcost.controller;
import lostcost.lostcost.dto.RouteRequest;
import lostcost.lostcost.service.OsrmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/osrm")
public class OsrmController {
    private final OsrmService osrmService;

    @Autowired
    public OsrmController(OsrmService osrmService) {
        this.osrmService = osrmService;
    }

    @PostMapping("/route")
    public ResponseEntity<String> getRoute(@RequestBody RouteRequest request) {
        String coordinates = request.getFromLon() + "," + request.getFromLat() + ";"
                + request.getToLon() + "," + request.getToLat();
        String route = osrmService.getRoute(coordinates);
        return ResponseEntity.ok(route);
    }

    @GetMapping("/route/{profile}/{fromLongitude}/{fromLatitude}/{toLongitude}/{toLatitude}")
    public String getRoute(@PathVariable String profile, @PathVariable String fromLongitude, @PathVariable String fromLatitude, @PathVariable String toLongitude, @PathVariable String toLatitude) {
        return osrmService.getRoute(profile, fromLongitude, fromLatitude, toLongitude, toLatitude);
    }
}
