package lostcost.lostcost.controller;

import lostcost.lostcost.dto.OsmPointDTO;
import lostcost.lostcost.service.OsmPointService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/osm-points")
public class OsmPointController {

    private final OsmPointService osmPointService;

    public OsmPointController(OsmPointService osmPointService) {
        this.osmPointService = osmPointService;
    }

    @GetMapping("/search")
    public ResponseEntity<List<OsmPointDTO>> searchOsmPoints(@RequestParam String name) {
        List<OsmPointDTO> osmPointsDTO = osmPointService.searchOsmPointsByName(name);
        return new ResponseEntity<>(osmPointsDTO, HttpStatus.OK);
    }
}
