package lostcost.lostcost.repository;

import lostcost.lostcost.dto.OsmEntityDTO;
import lostcost.lostcost.entity.OsmLine;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OsmLineRepository extends JpaRepository<OsmLine, Long> {
    List<OsmLine> findByNameContainingIgnoreCase(String name);
}
