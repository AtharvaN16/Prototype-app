import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Symbol } from '@/components/ui/symbol';
import { Text } from '@/components/ui/text';
import { usePrototype } from '@/lib/prototype/prototype-provider';
import * as Haptics from 'expo-haptics';
import { Pressable } from 'react-native';

export function ProjectPicker() {
  const { projects, project, selectProject } = usePrototype();

  function onValueChange(projectId: string) {
    if (projectId === project.id) return;
    Haptics.selectionAsync();
    selectProject(projectId);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Project: ${project.name}. Change project`}
          className="flex-row items-center gap-2 self-start py-1 active:opacity-60">
          <Text variant="h3">{project.name}</Text>
          <Symbol name="chevron.down" weight="semibold" className="text-muted-foreground size-4" />
        </Pressable>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64">
        <DropdownMenuLabel>Projects</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={project.id} onValueChange={onValueChange}>
          {projects.map((p) => (
            <DropdownMenuRadioItem key={p.id} value={p.id}>
              <Text>{p.name}</Text>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
