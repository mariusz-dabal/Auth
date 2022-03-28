<?php

namespace App\Entity;

use App\Repository\ChallengeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: ChallengeRepository::class)]
class Challenge
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'datetime_immutable')]
    #[Assert\NotBlank]
    private $start_date;

    #[ORM\Column(type: 'dateinterval')]
    private $duration;

    #[ORM\OneToMany(mappedBy: 'challenge', targetEntity: User::class)]
    private $participants;

    public function __construct()
    {
        $this->participants = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStartDate(): ?\DateTimeImmutable
    {
        return $this->start_date;
    }

    public function setStartDate(\DateTimeImmutable $start_date): self
    {
        $this->start_date = $start_date;

        return $this;
    }

    public function getDuration(): ?\DateInterval
    {
        return $this->duration;
    }

    public function setDuration(\DateInterval $duration): self
    {
        $this->duration = $duration;

        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    public function getParticipants(): Collection
    {
        return $this->participants;
    }

    public function addParticipant(User $participant): self
    {
        if (!$this->participants->contains($participant)) {
            $this->participants[] = $participant;
            $participant->setChallenge($this);
        }

        return $this;
    }

    public function removeParticipant(User $participant): self
    {
        if ($this->participants->removeElement($participant)) {
            // set the owning side to null (unless already changed)
            if ($participant->getChallenge() === $this) {
                $participant->setChallenge(null);
            }
        }

        return $this;
    }
}
