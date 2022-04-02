<?php

namespace App\Command;

use App\Entity\Day;
use App\Repository\ChallengeRepository;
use App\Repository\DayRepository;
use App\Service\ChallengeService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'app:create-day',
    description: 'Create new day',
)]
class CreateDayCommand extends Command
{
    public function __construct(
        private ChallengeService $challengeService,
        private ChallengeRepository $challengeRepository,
        private EntityManagerInterface $entityManager,
        private DayRepository $dayRepository
    )
    {
        parent::__construct();
    }

    protected function configure(): void
    {
        $this
            ->addArgument('arg1', InputArgument::OPTIONAL, 'Argument description')
            ->addOption('option1', null, InputOption::VALUE_NONE, 'Option description')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        $challenges = $this->challengeRepository->findAll();

        foreach ($challenges as $challenge) {
            foreach ($challenge->getParticipants() as $participant) {
                /** @var Day $currentDay */
                $currentDay = $this->dayRepository->findActiveDay($participant);
                if (null !== $currentDay) {
                    $currentDay->setActive(false);
                    $this->entityManager->persist($currentDay);
                }

                $day = new Day();
                $day->setReps(0);
                $day->setChallenge($challenge);
                $day->setParticipant($participant);

                $this->entityManager->persist($day);
                $this->entityManager->flush();
            }
        }

        $io->success('New day has begun! Pass --help to see your options.');

        return Command::SUCCESS;
    }
}
