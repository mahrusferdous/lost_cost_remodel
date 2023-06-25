package lostcost.lostcost.repository;

import lostcost.lostcost.dto.OsmEntityDTO;
import lostcost.lostcost.entity.OsmRoad;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OsmRoadRepository extends JpaRepository<OsmRoad, Long> {
    List<OsmRoad> findByNameContainingIgnoreCase(String name);
}
