//package lostcost.lostcost.controller;
//
//import lostcost.lostcost.dto.OsmEntityDTO;
//import lostcost.lostcost.service.OsmEntityService;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Set;
//import java.util.concurrent.ExecutionException;
//
//@RestController
//@RequestMapping("/api/osm-entities")
//public class OsmEntityController {
//
//    private final OsmEntityService osmEntityService;
//
//    public OsmEntityController(OsmEntityService osmEntityService) {
//        this.osmEntityService = osmEntityService;
//    }
//
//    @GetMapping("/search/{name}")
//    public ResponseEntity<Set<OsmEntityDTO>> searchOsmEntitiesByName(@PathVariable String name) {
//        try {
//            Set<OsmEntityDTO> osmEntities = osmEntityService.searchOsmEntitiesByName(name).get();
//            return ResponseEntity.ok(osmEntities);
//        } catch (InterruptedException | ExecutionException e) {
//            // Handle the exception appropriately
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }
//    }
//}
