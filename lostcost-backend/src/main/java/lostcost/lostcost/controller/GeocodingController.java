package lostcost.lostcost.controller;
import com.graphhopper.util.shapes.GHPoint;
import lostcost.lostcost.dto.OsmPointDTO;
import lostcost.lostcost.service.GeocodingService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class GeocodingController {

    private final GeocodingService geocodingService;

    public GeocodingController(GeocodingService geocodingService) {
        this.geocodingService = geocodingService;
    }

    @GetMapping("/geocode/{placeName}")
    public List<OsmPointDTO> geocode(@PathVariable String placeName) {
        return geocodingService.geocode(placeName);
    }
}
