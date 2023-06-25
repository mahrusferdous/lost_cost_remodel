package lostcost.lostcost.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "planet_osm_point")
public class OsmPoint {
    @Id
    @Column(name = "osm_id")
    private Long osmId;

    @Column(name = "name")
    private String name;

    @OneToOne
    @JoinColumn(name = "osm_id", referencedColumnName = "id")
    private OsmNode osmNode;

}
