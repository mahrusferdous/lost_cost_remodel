package lostcost.lostcost.controller;

import lostcost.lostcost.dto.OsmEntityDTO;
import lostcost.lostcost.service.OsmPointService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/osm-points")
@CrossOrigin(origins = "*")
public class OsmPointController {

   private final OsmPointService osmPointService;

   public OsmPointController(OsmPointService osmPointService) {
       this.osmPointService = osmPointService;
   }

    @GetMapping("/search")
    public CompletableFuture<ResponseEntity<List<OsmEntityDTO>>> searchOsmPoints(@RequestParam String name) {
        try {
            return osmPointService.searchOsmPointsByName(name)
                    .thenApply(ResponseEntity::ok)
                    .exceptionally(e -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
        } catch (Exception e) {
            return CompletableFuture.completedFuture(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
        }
    }

}
